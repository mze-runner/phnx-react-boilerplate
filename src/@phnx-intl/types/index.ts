import { MessageFormatElement } from 'react-intl';

export type Messages = Record<string, string> | Record<string, MessageFormatElement[]>
// Record<MessageIds, string> | Record<MessageIds, MessageFormatElement[]>;

export type LocaleCode = 'fr-FR' | 'ru-RU' | 'en-US'| 'en-GB';

// export type LocaleCode = typeof localeCode[number];
// type Animal = typeof animals[number]
// export type DateLocaleCode = typeof dateLocaleCode[number];

export type ValuesField =  {
	[key: string]: string
};

export type MessagesItem = {
	code: LocaleCode,
	messages: Messages
}