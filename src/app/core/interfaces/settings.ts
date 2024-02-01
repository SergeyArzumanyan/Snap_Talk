export interface ISettings {
    PersonalInfo: IPersonalInfo;
    Appearance: IAppearance;
}

export interface IPersonalInfo {
    Id: number;
    Status: number;
    Username: string;
    FullName: string;
    Email: string;
    Avatar: string;
}

export interface IAppearance {
    Theme: string;
    MainColor: string;
}
