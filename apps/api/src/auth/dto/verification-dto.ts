export class VerificationDto {
  readonly body: {
    readonly email: string;
    readonly password: string;
    readonly verification_code: string;
  };
}
