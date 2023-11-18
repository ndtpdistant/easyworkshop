export class CreateCommentDto {
  readonly body: {
    readonly item_id: number;
    readonly user_id: number;
    readonly parent_comment_id: number;
    readonly content: string;
  };
}
