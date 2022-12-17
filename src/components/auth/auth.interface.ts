export interface IJwtPayload {
    userId: number;
    username: string;
    roleIds: number[];
}

export interface ILoginBody {
    username: string;
    password: string;
}

export interface IRegisterBody {
    username: string;
    password: string;
    email: string;
    roleIds: number[];
}
