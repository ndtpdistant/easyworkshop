import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { Table } from 'sequelize-typescript';
import { Item } from 'src/items/items.model';
import { User } from 'src/users/users.model';

interface ItemLikeCreationAttrs {
  item_id: number;
  user_id: number;
}

@Table({ tableName: 'item_likes' })
export class ItemLike extends Model<ItemLike, ItemLikeCreationAttrs> {
  @ForeignKey(() => Item)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
  })
  item_id: number;

  @BelongsTo(() => Item)
  item: Item;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
