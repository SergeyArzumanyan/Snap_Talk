import { IMessage } from "@app/core";

export interface IChat {
  Id: number;
  CreatedAt: Date;
  UserId: number;
  Messages: IMessage[];
}
