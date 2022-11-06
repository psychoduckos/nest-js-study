import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create.user.dto";
import { Injectable } from "@nestjs/common";
import { RolesService } from "src/roles/roles.service";
import { UserRoles } from "src/roles/user-roles.model";

@Injectable()
export class UsersService {

  constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService,
        @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles,
        ) {
  }

  async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('USER');
        await this.userRolesRepository.create({
          roleId: role.id,
          userId: user.id
        })
        user.roles = [role]
      return user
  }

  async getAllusers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users
  }

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({where: {phone}, include: {all: true}})
    return user
  }

}
