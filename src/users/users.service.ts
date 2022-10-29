import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create.user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    return user

  }

  async getAllusers() {
    const users = await this.userRepository.findAll();
    return users

  }

}
