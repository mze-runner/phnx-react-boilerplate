// app global application provide
import { FC, PropsWithChildren, useMemo } from 'react';
import { RawIntlProvider, createIntlCache, createIntl, IntlCache } from 'react-intl';
import type { LocaleCode, Messages, MessagesItem } from './types';
import { defaultLocale as intlDefaultLocale } from './const';
import { OnErrorFn } from '@formatjs/intl/src/types';
import useInternalization from './hooks/useInternalization';
// import { IntlShape } from 'react-intl/src/types';

export interface IntlProviderProps {
    locale: LocaleCode;
    timezone?: string;
    messages: Messages;
    defaultLocale?: LocaleCode;
}

const onIntlError: OnErrorFn = (err) => {
    console.log(err);
};

// This is optional but highly recommended
// since it prevents memory leak
const cache: IntlCache = createIntlCache();

// export declare const Provider: React.Provider<IntlShape>;
// export declare const Context: React.Context<IntlShape>;

const IntlProvider: FC<PropsWithChildren<IntlProviderProps>> = ({
    locale= intlDefaultLocale,
    messages,
    timezone,
    defaultLocale = intlDefaultLocale,
    children
}) => {

    const _intl = useMemo(() => {
        return createIntl({
            locale: locale,
            timeZone: timezone,
            messages: messages,
            defaultLocale: defaultLocale,
            onError: onIntlError
        }, cache);
    }, [locale, messages, timezone, defaultLocale]);

    // ensure Intl avila  on browser (!)
    if (!Intl.DateTimeFormat().resolvedOptions().timeZone) {
        throw new Error('Time zone is not available in this environment!');
    }

    return <RawIntlProvider key={locale} value={_intl}>{children}</RawIntlProvider>;

};

export {
    IntlProvider,
    useInternalization,
    LocaleCode,
    Messages,
    MessagesItem
};