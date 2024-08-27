export type User = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    status: boolean;
 };
 export type User_body = {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    status?: boolean;
 };
 