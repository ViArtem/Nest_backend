import { Injectable, Inject, HttpException } from "@nestjs/common";
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
    try {
      const user = await this.userRepository.create(userData);
      const role = await this.roleServise.getRoleByValue("MANAGER");

      await user.$set("roles", [role.id]);
      user["roles"] = [role];
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.findAll({
        include: { all: true },
      });

      return users;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteUser(userData: DeleteUserDto) {
    try {
      const deleteStatus = await this.userRepository.destroy({
        where: {
          id: userData.userId,
        },
      });
      return deleteStatus;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = this.userRepository.findOne({
        where: {
          email,
        },
        include: { all: true },
      });

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
