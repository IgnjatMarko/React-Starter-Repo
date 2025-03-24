import { Client } from 'appwrite'

declare module 'appwrite' {
    export class Account {
        constructor(client: Client)
        createEmailPasswordSession(
            email: string,
            password: string
        ): Promise<Models.Session>
        get(): Promise<Models.User<Models.Preferences>>
        deleteSession(sessionId: string): Promise<void>
        create(
            userId: string,
            email: string,
            password: string,
            name?: string
        ): Promise<Models.User<Models.Preferences>>
    }
}
