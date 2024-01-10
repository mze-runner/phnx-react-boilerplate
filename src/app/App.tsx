import { ApplicationProvider, createApplication } from '../@phnx-core';
import { MessagesItem } from '../@phnx-intl';
import { router } from './router.tsx';
import en_GB from '../i18n/en-GB.json';
import ru_RU from '../i18n/ru-RU.json';

const languages: MessagesItem[] = [
    { code: 'en-GB',  messages: en_GB },
    { code: 'ru-RU',  messages: ru_RU }
];

const app = createApplication({ router });

function App() {

    return (
        <ApplicationProvider
            locale="en-GB"
            messages={languages}
            defaultLocale="en-GB"
            app={app}
        />
    );
}

export default App;
