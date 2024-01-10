import { useIntl, FormatNumberOptions } from 'react-intl';
import { ValuesField } from '../types';
import { defaultMessageBuilder } from '../helpers';

type FormatMessageParams = {
	messageId: string;
	defaultMessage?: string;
	values?: ValuesField;
}

type FormatNumberParams = {
    value: number;
    options?: FormatNumberOptions // Intl.NumberFormatOptions & {format?: string}
}

type FormatTextMessageFnc = (p: FormatMessageParams) => string
type FormatNumberMessageFnc = (p: FormatNumberParams) => string

const useInternalization = () => {
    const {
        formatMessage,
        formatNumber
    } = useIntl();

    const formatTextMessage: FormatTextMessageFnc = ({ messageId, defaultMessage, values  }): string => {
        const msg = formatMessage(
            {
                id: messageId,
                defaultMessage: defaultMessage || defaultMessageBuilder(messageId),
            }, values);

        return msg;
    };

    const formatNumberMessage: FormatNumberMessageFnc = ({ value, options}): string => {
        const msg = formatNumber(value, options);
        return msg;
    };

    return {
        formatTextMessage, formatNumberMessage
    };
};

export default useInternalization;