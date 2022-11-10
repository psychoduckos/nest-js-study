import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create.user.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RolesService } from "src/roles/roles.service";
import { UserRoles } from "src/roles/user-roles.model";
import { AddRoleDto } from "./dto/add.role.dto";
import { BanUserDto } from "./dto/ban.user.dto";

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

  async addRole(dto: AddRoleDto) {
       const user = await this.userRepository.findByPk(dto.id)
       const role = await this.roleService.getRoleByValue(dto.value)

       if(role && user) {
          await user.$add('role', role.id)
          return dto
       }
       throw new HttpException('User or role is not defind', HttpStatus.NOT_FOUND)
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.id)
    if(user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return user
    }
   throw new HttpException('User or role is not defind', HttpStatus.NOT_FOUND)
  }

}
