import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { User } from 'src/users/users.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async getCommentsWithChildren(itemId: number): Promise<any> {
    const comments = await this.commentRepository.findAll({
      where: { item_id: itemId, parent_comment_id: null }, // Fetch root comments
      include: [
        {
          model: Comment,
          as: 'children',
          include: [{ model: Comment, as: 'children' }],
        },
      ],
      order: [['createdAt', 'DESC']], // Sort comments by createdAt date in descending order
    });

    const formattedComments = comments.map((comment) =>
      this.formatComment(comment),
    );

    return formattedComments;
  }

  private formatComment(comment: Comment): any {
    const formattedComment = {
      comment: {
        id: comment.id,
        content: comment.content,
        children: comment.children.map((child) => this.formatComment(child)),
      },
    };

    return formattedComment;
  }

  createComment(dto: CreateCommentDto) {
    try {
      const comment = this.commentRepository.create(dto);
      return comment;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
