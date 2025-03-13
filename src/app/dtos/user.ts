export interface User {
    id: number;
    email: string;
    password: string;
    roles: Role[];
    refreshToken: RefreshToken;
}

export enum Role {
    USER,
    ADMIN,
    MAINTAINER
}