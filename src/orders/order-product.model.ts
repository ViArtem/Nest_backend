import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
interface OrderProductCreationAttrs {
  id: string;
  orderId: string;
  productId: string;
  count: number;
  price: number | string;
}

@Table({ tableName: "orders-products" })
export class OrderProducts extends Model<
  OrderProducts,
  OrderProductCreationAttrs
> {
  @Column({
    field: "_id",
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
    defaultValue: uuidv4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  productId: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  count: number;

  @Column({ type: DataType.NUMBER, allowNull: false })
  price: number;

  @Column({ field: "order_id", type: DataType.STRING, allowNull: false })
  orderId: string;
}
