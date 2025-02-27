interface IUserEntity {
    id?: string,
    name: string,
    email: string,
    password: string,
    loggedAt?: Date,
    updatedAt?: Date,
    createdAt?: Date
}

export class UserEntitiy {
    private _id?: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private _loggedAt?: Date;
    private _updatedAt?: Date;
    private _createdAt?: Date;

    constructor(userEntitiy: IUserEntity) {
        this._id = userEntitiy.id;
        this._name = userEntitiy.name;
        this._email = userEntitiy.email;
        this._password = userEntitiy.password;
        this._loggedAt = userEntitiy.loggedAt;
        this._updatedAt = userEntitiy.updatedAt;
        this._createdAt = userEntitiy.createdAt;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public get loggedAt(): Date | undefined {
        return this._loggedAt;
    }

    public get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    public get createdAt(): Date | undefined {
        return this._createdAt;
    }
}