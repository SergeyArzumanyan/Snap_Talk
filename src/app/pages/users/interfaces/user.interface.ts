import { IChat } from "@app/core";

export interface IUser {
  Id: number;
  Name: string;
  Surname?: string;
  Username: string;
  Gender: 'Male' | 'Female';
  Mail: string;
  RegisteredDate: Date;
  Chats: IChat[];
  IsOnline: boolean;
}

export interface IUserAddBody {
  Name: string;
  Surname?: string;
  Username: string;
  Gender: 'Male' | 'Female';
  Mail: string;
  IsOnline?: boolean;
}
