

export const defaultMessageBuilder = (id: string): string => {
    return `Message ID = "${id}" is not found at language file.`;
};

export function isValidTimeZone(tz: string): boolean | never {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
        throw new Error('Time zones are not available in this environment');
    }
    try {
        Intl.DateTimeFormat(undefined, {timeZone: tz});
        return true;
    }
    catch (ex) {
        return false;
    }
}