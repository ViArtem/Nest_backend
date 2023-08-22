import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface ProductInfo {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

interface OrderCreationAttrs {
  userId: string;
  addresses: string;
  clientNumber: string;
  productInfo: ProductInfo[];
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  addresses: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  clientNumber: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  productInfo: ProductInfo[];

  @ForeignKey(() => User)
  @Column({
    field: "user_id",
    type: DataType.STRING,
    allowNull: false,
  })
  user_id: string;

  @BelongsTo(() => User)
  user: User;
}
