export class CustomAxiosConfig {
    headers?: {
        accessToken?: string;
        refreshToken?: string;
        [key: string]: string | undefined;
    };
}