import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttribute {
  value: string,
  description: string
}

@Table({tableName: "Role", createdAt: false, updatedAt: false})
export class Role extends Model <Role, RoleCreationAttribute> {

  @ApiProperty({example: 1, description: 'Uniq Id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

  @ApiProperty({example: 'admin/user/moderator', description: 'User role'})
  @Column({type: DataType.STRING, allowNull: false, unique: true})
    value: string;

  @ApiProperty({example: 'Admin - ...', description: 'descriptions for role'})
  @Column({type: DataType.STRING, allowNull: false})
    description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]

}