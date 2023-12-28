export interface ISettings {
    PersonalInfo: IPersonalInfo;
    Appearance: IAppearance;
}

export interface IPersonalInfo {
    Id: number;
    Status: number;
    UserName: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Avatar: string;
}

export interface IAppearance {
    Theme: string;
    MainColor: string;
}