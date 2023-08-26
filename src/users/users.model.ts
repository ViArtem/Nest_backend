import {
  BelongsToMany,
  HasMany,
  Column,
  DataType,
  Model,
  Table,
  HasOne,
} from "sequelize-typescript";
import { Categories } from "src/categories/categories.model";
import { Products } from "src/products/product.model";
import { Refresh } from "src/refresh/refresh.model";
import { Role } from "src/roles/role.model";
import { UserRole } from "src/roles/user-role.model";

interface UserCreationAttrs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    field: "_id",
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ field: "first_name", type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ field: "last_name", type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ field: "is_active", defaultValue: true })
  isActive: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Categories)
  categories: Categories[];

  @HasMany(() => Products)
  products: Products[];

  @HasOne(() => Refresh)
  refresh: any;
  userId: string;
}
