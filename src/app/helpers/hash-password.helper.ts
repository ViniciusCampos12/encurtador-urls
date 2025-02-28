import bcrypt from "bcryptjs";

export class HashPasswordHelper {
    public static async cryptPassword(password: string): Promise<string> {
        const rounds = 10;
        return await bcrypt.hash(password, rounds);
    }

    public static async comparePassword(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        try {
            return await bcrypt.compare(plainTextPassword, hashedPassword);
        } catch (error) {
            throw error;
        }
    }
}