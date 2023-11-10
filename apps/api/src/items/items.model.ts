import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface ItemCreationAttrs {
  item_name: string;
  user_id: number;
  about: string;
  filepath: string[];
}

@Table({ tableName: 'items' })
export class Item extends Model<Item, ItemCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  item_name: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    unique: true,
    allowNull: false,
  })
  filepath: string[];

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  about: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  user_id: User;

  @BelongsTo(() => User)
  user: User;
}
