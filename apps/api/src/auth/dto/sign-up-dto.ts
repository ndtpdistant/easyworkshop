export class SignUpDto {
  readonly body: {
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly first_name: string;
    readonly last_name: string;
  };
}
