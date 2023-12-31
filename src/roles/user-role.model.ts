import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./role.model";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @Column({
    field: "_id",
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  userId: string;
}
