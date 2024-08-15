import { Platform } from '@/constants';

export function getTargetOrigin(platform: Platform): string {
    if (platform === Platform.GITHUB) {
        return 'https://github.com/*/*/issues';
    }
    return '';
}
