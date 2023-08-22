import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Categories } from "src/categories/categories.model";

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

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ field: "purchase_price", type: DataType.INTEGER, allowNull: false })
  purchasePrice: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @ForeignKey(() => Categories)
  @Column({ field: "user_id", type: DataType.STRING, allowNull: false })
  categoryId: string;

  @BelongsTo(() => Categories)
  author: Categories;
}
