import { Injectable, Inject } from "@nestjs/common";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { RolesService } from "src/roles/roles.service";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USER_REPOSITORY") private userRepository: typeof User,
    private roleServise: RolesService
  ) {}

  async createUser(userData: CreateUserDto) {
    const user = await this.userRepository.create(userData);
    const role = await this.roleServise.getRoleByValue("MANAGER");

    await user.$set("roles", [role.id]);
    user["roles"] = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });

    return users;
  }

  async deleteUser(userData: DeleteUserDto) {
    const deleteStatus = await this.userRepository.destroy({
      where: {
        id: userData.userId,
      },
    });
    return deleteStatus;
  }

  async getUserByEmail(email: string) {
    const user = this.userRepository.findOne({
      where: {
        email,
      },
      include: { all: true },
    });

    return user;
  }
}
