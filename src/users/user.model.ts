import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttribute {
  userName: string,
  phone: string,
  password: string
}

@Table({tableName: "users"})
export class User extends Model <User, UserCreationAttribute> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
    userName: string;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
    phone: string;

  @Column({type: DataType.STRING, allowNull: false})
    password: string;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

  @Column({type: DataType.STRING, allowNull: true})
    banReason: string;
}