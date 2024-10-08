import { Platform } from '@/constants';

export function snake2pascal(name: string): string {
    const camelCase = name.replace(/[./_]([a-z])/g, (_, char) => char.toUpperCase());
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

export function pascal2pathname(name: string): string {
    const pathname = name.replace(/(\/[A-Za-z]|[a-z][A-Z])/g, (_, char) => {
        const first = char.charAt(0);
        const second = char.charAt(1).toLowerCase();
        if (first === '/') {
            return `.${second}`;
        }
        return `${first}.${second}`;
    });
    return pathname.charAt(0).toLowerCase() + pathname.slice(1);
}

export function pathname2requestName(pathname: string): string {
    return pathname.replaceAll('/', '.');
}

export function parsePlatform(host: string): Platform | null {
    switch (host) {
        case 'github.com':
            return Platform.GITHUB;
        default:
            return null;
    }
}

export function removeSpecialCharacters(value: string): string {
    return value.replace(/[\n\r"\\]/g, '');
}

export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
