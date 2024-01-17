import { IChat } from "@app/core";

export interface IUser {
  Id: number;
  FirstName: string;
  LastName: string;
  Username: string;
  Gender: 'Male' | 'Female';
  Email: string;
  RegisteredDate: Date;
  Chats: IChat[];
  IsOnline: boolean;
}

export interface IUserAddBody {
  FirstName: string;
  LastName: string;
  Username: string;
  Gender: 'Male' | 'Female';
  Email: string;
  IsOnline?: boolean;
}
