import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/comments.model';
import { ItemLike } from 'src/item-likes/item-likes.model';
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
    allowNull: false,
  })
  user_id: User;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => ItemLike)
  itemLikes: ItemLike[];
}
