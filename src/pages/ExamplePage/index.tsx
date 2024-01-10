import { FC } from 'react';
import { useApplicationContext } from '../../@phnx-core';
import { useInternalization } from '../../@phnx-intl';

const ExamplePage: FC = () => {
    const { locale, defaultLocale, updateLocale, timezone, updateTimezone } = useApplicationContext();
    const { formatTextMessage } = useInternalization();
    const onUpdateTimezoneClick =() => {
        if (timezone === 'SG') {
            updateTimezone('CET');
            return;
        }
        updateTimezone('SG');
    };

    const onUpdateLocaleClick =() => {
        if (locale === 'en-GB') {
            updateLocale('ru-RU');
            return;
        }
        updateLocale('en-GB');
    };
    console.log('ExamplePage --> render...');
    return (
        <>
            <p>this is an example page</p>
            <p>{formatTextMessage({messageId: 'widget.intl.language'})}: {formatTextMessage({messageId: 'system.language'})}</p>
            <p>Language broken: {formatTextMessage({messageId: 'system.language'})}</p>
            <p>Locale: {locale}</p>
            <p>Timezone: {timezone}</p>
            <p>DefaultLocale: {defaultLocale}</p>
            <button onClick={onUpdateTimezoneClick}>Update Timezone</button>
            <button onClick={onUpdateLocaleClick}>Update Locale</button>
        </>
    );
};

export default ExamplePage;