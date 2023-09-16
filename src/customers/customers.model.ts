import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { User } from "src/users/users.model";

interface CustomersCreationAttrs {
  id: string;
  firstName: string;
  lastName: string;
  addresses: string;
  userId: string;
}

@Table({ tableName: "customers" })
export class Customers extends Model<Customers, CustomersCreationAttrs> {
  @Column({
    field: "_id",
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ field: "first_name", type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ field: "last_name", type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  addresses: string;

  @Column({ type: DataType.STRING, allowNull: false })
  contacts: string;

  @ForeignKey(() => User)
  @Column({ field: "user_id", type: DataType.STRING, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  manager: User;
}
