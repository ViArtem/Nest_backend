import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface StatisticsCreationAttrs {
  id: string;
  userId: string;
  count: string;
}

@Table({ tableName: "statistics" })
export class UserStatistics extends Model<
  UserStatistics,
  StatisticsCreationAttrs
> {
  @Column({
    field: "_id",
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  count: string;

  @ForeignKey(() => User)
  @Column({ field: "user_id", type: DataType.STRING, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  author: User;
}
