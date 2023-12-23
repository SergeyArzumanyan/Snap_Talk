export interface IMessage {
  SenderId: number;
  ChatId: number;
  Text: string;
  CreatedAt: Date;
  Id: number;
}

export interface IAddMessageBody {
  SenderId: number;
  ChatId: number;
  Text: string;
}
