import { RefreshTokenRequest } from "./auth-dto";

export interface User {
    id: number;
    email: string;
    password: string;
    roles: Role[];
    refreshToken: RefreshTokenRequest;
}

export enum Role {
    USER,
    ADMIN,
    MAINTAINER
}