import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
} from 'sequelize-typescript';
import { Table } from 'sequelize-typescript';
import { CommentLike } from 'src/comment-likes/comment-likes.model.ts';
import { Item } from 'src/items/items.model';
import { User } from 'src/users/users.model';

interface CommentCreationAttrs {
  item_id: number;
  user_id: number;
  parent_comment_id: number;
  content: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
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

  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
  })
  parent_comment_id: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  content: string;

  @HasMany(() => Comment, 'parent_comment_id')
  children: Comment[];

  @HasMany(() => CommentLike)
  commentLikes: CommentLike[];
}
