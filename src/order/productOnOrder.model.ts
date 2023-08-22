import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Order } from './order.model';

interface IProductOnOrder {
  id: string;
  order_id: string;
  productName: string;
  quantity: number;
  price: number;
}

@Table({ tableName: 'productOnOrder' })
export class ProductOnOrder extends Model<ProductOnOrder, IProductOnOrder> {
  @Column({ field: '_id', type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @ForeignKey(() => Order)
  @Column({
    field: 'order_id',
    type: DataType.STRING,
    allowNull: false,
  })
  order_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  productName: string;
  @Column({ type: DataType.STRING, allowNull: false })
  quantity: number;
  @Column({ type: DataType.STRING, allowNull: false })
  price: number;

  @BelongsTo(() => Order)
  order: Order;
}
