export interface IUserStorage {
    used: number,
    total: number,
}

export interface IUser {
    user_id: number,
    username: string,
    storage: IUserStorage,
}