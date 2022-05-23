export interface User {
    id?: number;
    date?: string;
    username: string;
    lastname?: string;
    email: string;
    password?: string;
    avatar?: string;
    birthDate?: string;
}

export interface UserLogin {
    email: string;
    password?: string;
}
