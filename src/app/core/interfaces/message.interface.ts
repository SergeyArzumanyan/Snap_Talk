export interface IMessage {
  SenderId: number;
  ChatId: number;
  Text: string;
}

export interface IMessageSocketResponse {
  Messages: IMessage[];
}
