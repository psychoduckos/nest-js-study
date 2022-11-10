import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import { Roles } from "src/auth/roles.auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateUserDto } from "./dto/create.user.dto";
import { User } from "./user.model";
import { UsersService } from "./users.service";

@ApiTags('Users')
@Controller('users')
export class UsersController {

      constructor(private  userService: UsersService) {}

      @ApiOperation({summary: 'Create user'})
      @ApiResponse({status: 200, type: User})
      @Post()
      create(@Body() userDto: CreateUserDto) {
            return this.userService.createUser(userDto)
      }


      @ApiOperation({summary: 'Get user'})
      @ApiResponse({status: 200, type: [User]})
      @Roles('ADMIN', 'MODERATOR')
      @UseGuards(RolesGuard)
      @Get()
      getAll() {
            return this.userService.getAllusers()
      }


}
