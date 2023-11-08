export class SignInDto {
  readonly body: {
    readonly login: string;
    readonly password: string;
  };
}
