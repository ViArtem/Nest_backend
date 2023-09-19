import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { User } from "src/users/users.model";

interface OrderCreationAttrs {
  id: string;
  customerId: string;
  productsIds: string[];
  isActive: boolean;
  userId: string;
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({
    field: "_id",
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  customerId: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  productsIds: string[];

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;

  @ForeignKey(() => User)
  @Column({ field: "user_id", type: DataType.STRING, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  manager: User;
}
