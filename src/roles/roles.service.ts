import { Injectable, Inject } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.model";

@Injectable()
export class RolesService {
  constructor(@Inject("ROLE_REPOSITORY") private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const createRole = await this.roleRepository.create(dto);
    return createRole;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({
      where: {
        value,
      },
    });

    return role;
  }
}
