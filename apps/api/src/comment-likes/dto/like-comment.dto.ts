export class LikeCommentDto {
  readonly body: {
    readonly comment_id: number;
    readonly user_id: number;
  };
}
