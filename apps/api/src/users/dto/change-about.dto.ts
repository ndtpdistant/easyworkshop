export class ChangeAboutDto {
  readonly title: string;
  readonly body: {
    readonly about: string;
  };
}
