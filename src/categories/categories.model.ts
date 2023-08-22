import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  HasMany,
} from "sequelize-typescript";
import { Products } from "src/products/product.model";
import { User } from "src/users/users.model";

interface CategoriesCreationAttrs {
  id: string;
  userId: string;
  name: string;
  markup: number;
}

@Table({ tableName: "categories" })
export class Categories extends Model<Categories, CategoriesCreationAttrs> {
  @Column({
    field: "_id",
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  markup: number;

  @ForeignKey(() => User)
  @Column({ field: "user_id", type: DataType.STRING, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => Products)
  categories: Products[];
}
