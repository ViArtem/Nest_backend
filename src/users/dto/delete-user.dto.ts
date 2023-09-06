import { IsUUID } from "class-validator";

export class DeleteUserDto {
  @IsUUID()
  readonly userId: string;
}
