import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Comment } from 'src/comments/comments.model';

interface CommentLikeCreationAttrs {
  item_id: number;
  user_id: number;
}

@Table({ tableName: 'comment_likes' })
export class CommentLike extends Model<CommentLike, CommentLikeCreationAttrs> {
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
  })
  comment_id: number;

  @BelongsTo(() => Comment)
  comment: Comment;

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
