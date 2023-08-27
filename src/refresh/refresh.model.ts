import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  Length,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface RefreshCreationAttrs {
  id: string;
  refresh: string;
  userId: string;
}

@Table({ tableName: "refresh" })
export class Refresh extends Model<User, RefreshCreationAttrs> {
  @Column({
    field: "_id",
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  refresh: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  owner: User;
}
