import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { ProductOnOrder } from './productOnOrder.model';
import { CreateProductOnOrderDto } from './dto/create-productOnOrder.dto';

interface OrderCreationAttrs {
  id: string;
  user_id: string;
  addresses: string;
  clientNumber: string;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({ field: '_id', type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: DataType.STRING,
    allowNull: false,
  })
  user_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  addresses: string;

  @Column({ type: DataType.STRING, allowNull: false })
  clientNumber: string;
  
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => ProductOnOrder)
  order: ProductOnOrder[];
}
