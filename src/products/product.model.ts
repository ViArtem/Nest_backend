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
  image: string;
  price: number | string;
  purchasePrice: number | string;
  quantity: number | string;
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
  image: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number | string;

  @Column({ field: "purchase_price", type: DataType.INTEGER, allowNull: false })
  purchasePrice: number | string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number | string;

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
