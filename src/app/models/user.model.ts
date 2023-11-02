export class User {
    status?: number;
    userId?: number;
    username?: string;
    jwtExpiry?: string;

    constructor(
        status?: number | undefined,
        userId?: number | undefined,
        username?: string | undefined,
        jwtExpiry?: string | undefined) 
    {
        this.status = status;
        this.userId = userId;
        this.username = username;
        this.jwtExpiry = jwtExpiry;
    }
    
}