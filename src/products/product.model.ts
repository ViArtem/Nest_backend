import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Categories } from "src/categories/categories.model";
import { User } from "src/users/users.model";

interface ProductsCreationAttrs {
  id: string;
  name: string;
  description: string;
  img: string;
  price: number;
  purchasePrice: number;
  quantity: number;
  categoryId: string;
}

@Table({ tableName: "products" })
export class Products extends Model<Products, ProductsCreationAttrs> {
  @Column({
    field: "_id",
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  img: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ field: "purchase_price", type: DataType.INTEGER, allowNull: false })
  purchasePrice: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @ForeignKey(() => Categories)
  @Column({ field: "category_id", type: DataType.STRING, allowNull: false })
  categoryId: string;

  @ForeignKey(() => User)
  @Column({ field: "user_id", type: DataType.STRING, allowNull: false })
  userId: string;

  @BelongsTo(() => Categories)
  category: Categories;

  @BelongsTo(() => User)
  author: User;
}