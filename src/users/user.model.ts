import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttribute {
  userName: string,
  phone: string,
  password: string
}

@Table({tableName: "users"})
export class User extends Model <User, UserCreationAttribute> {
  @ApiProperty({example: 1, description: 'Uniq Id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

  @ApiProperty({example: 'psychoduck', description: 'Uniq username'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
    userName: string;

  @ApiProperty({example: '89030470912', description: 'Uniq user phone'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
    phone: string;

  @ApiProperty({example: 'qweasdzxc123', description: 'user password'})
  @Column({type: DataType.STRING, allowNull: false})
    password: string;

  @ApiProperty({example: true, description: 'If user banned'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

  @ApiProperty({example: 'User banned because', description: 'Reason banned'})
  @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

}