interface IShortnedUrl {
    id?: string
    shortCode: string
    originalEndpoint: string
    shortnedEndpoint: string
    userId?: string
    clicks: number
    updatedAt?: Date
    createdAt?: Date
    deletedAt?: Date
}

export class ShortnedUrlEntitiy {
    private _id?: string
    private _shortCode: string
    private _originalEndpoint: string
    private _shortnedEndpoint: string
    private _userId?: string
    private _clicks: number
    private _updatedAt?: Date
    private _createdAt?: Date
    private _deletedAt?: Date

    constructor(shortnedUrl: IShortnedUrl) {
        this._id = shortnedUrl.id;
        this._shortCode = shortnedUrl.shortCode;
        this._originalEndpoint = shortnedUrl.originalEndpoint;
        this._shortnedEndpoint = shortnedUrl.shortnedEndpoint;
        this._userId = shortnedUrl.userId;
        this._clicks = shortnedUrl.clicks;
        this._updatedAt = shortnedUrl.updatedAt;
        this._createdAt = shortnedUrl.createdAt;
        this._deletedAt = shortnedUrl.deletedAt;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public get shortCode(): string {
        return this._shortCode;
    }

    public get originalEndpoint(): string {
        return this._originalEndpoint;
    }

    public get shortnedEndpoint(): string {
        return this._shortnedEndpoint;
    }

    public get userId(): string | undefined {
        return this._userId;
    }

    public set userId(userId: string) {
        this._userId = userId;
    }

    public get clicks(): number {
        return this._clicks;
    }

    public get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    public get createdAt(): Date | undefined {
        return this._createdAt;
    }

    public get deletedAt(): Date | undefined {
        return this._deletedAt;
    }

    public addClick() {
        this._clicks = this._clicks + 1;  
    }

    public static generateShortCode(): string {
        const length = 6;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
    }
}