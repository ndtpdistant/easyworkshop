export class ForgotPasswordDto {
  readonly body: {
    readonly email: string;
    readonly new_password: string;
    readonly verification_code: string;
  };
}
