export interface IUser {
  Id: number;
  Name: string;
  Surname?: string;
  Username: string;
  Gender: 'Male' | 'Female';
  Mail: string;
  RegisteredDate: Date;
  Chats: any[];
  IsOnline: boolean;
}
