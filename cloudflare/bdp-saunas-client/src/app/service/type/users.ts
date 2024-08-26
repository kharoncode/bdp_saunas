export type User = {
   id: string;
   username: string;
   password: string;
   status: number;
};
export type User_body = {
   username?: string;
   password?: string;
   status?: number;
};
