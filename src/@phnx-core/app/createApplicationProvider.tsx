import React, { FC, useReducer, Reducer, useMemo, useEffect, useContext } from 'react';
import type { LocaleCode, MessagesItem, Messages } from '../../@phnx-intl';
import { ApplicationRouter, RouterProvider } from '../router';
import { IntlProvider } from '../../@phnx-intl';
import { useIntl } from 'react-intl';
import { QueryClient, QueryClientProvider, ReactQueryDevtools } from '../query';

export interface ApplicationContext {
    locale: LocaleCode;
    messages: MessagesItem[];
    timezone?: string;
}

interface Application {
    router: ApplicationRouter;
    query: QueryClient
}

interface ApplicationContextProviderProps {
    locale: LocaleCode;
    timezone?: string;
    messages: MessagesItem[];
    defaultLocale?: LocaleCode;
    // app objet
    app: Application
    // router object
    // router: ApplicationRouter;
}

type ReducerAction = {
    type: 'tz';
    payload: string;
} | {
    type: 'locale';
    payload: LocaleCode;
}

function isValidTimeZone(tz: string): boolean | never {
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

function reducer(state: ApplicationContext, action: ReducerAction): ApplicationContext {
    switch (action.type) {
    case 'locale': {
        // console.log('ApplicationProviderReducer: new locale ' + action.payload);
        return {...state, locale: action.payload };
    }
    case 'tz': {
        return {...state, timezone: action.payload};
    }
    default:
            // throw Error('Unknown action: ' + action.type);
        return {...state};
    }
    // per documentation
    // throw new Error('Unknown action: ' + action.type);
}

export function createCtx() {
    type UpdateType = React.Dispatch<React.ReducerAction<Reducer<ApplicationContext, ReducerAction>>>;
    const defaultUpdate: UpdateType = () => null;
    // console.log(defaultUpdate);
    type ApplicationCtx = { state: ApplicationContext | null; dispatch: UpdateType; };
    const ctx: React.Context<ApplicationCtx> = React.createContext<ApplicationCtx>({
        state: null,
        dispatch: defaultUpdate
    });

    const ApplicationProvider: FC<ApplicationContextProviderProps> = (
        {
            locale,
            timezone,
            defaultLocale,
            messages,
            app,
            // router
            // children
        }) => {

        const [state, dispatch] = useReducer<Reducer<ApplicationContext, ReducerAction>>(reducer, {
            locale,
            messages,
            timezone: timezone || ''
        });

        useEffect(() => {
            if(!timezone){
                // set default browser timezone
                const _tz = Intl.DateTimeFormat().resolvedOptions();
                // update({ ...state, timezone: _tz.timeZone });
                dispatch({ type: 'tz', payload: _tz.timeZone});
            }
            if(timezone) {
                // validate tz received from outside and ensure is valid otherwise add default one
                // isValidTimeZone(timezone) ? update({ ...state, timezone }) : update( { ...state, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
                isValidTimeZone(timezone) ? dispatch({ type: 'tz', payload: timezone}) : dispatch( { type: 'tz', payload: Intl.DateTimeFormat().resolvedOptions().timeZone });
            }
        }, [timezone]);

        const _msg: Messages = useMemo(() => {
            // console.log('ApplicationProvider: locale update triggered');
            const m = state.messages.find(value => value.code === state.locale);
            if(!m) {
                throw new Error(`Phnx.ApplicationProvider: unable to find locale messages for ${state.locale}`);
            }
            // console.log('ApplicationProvider: locale updated --> new code = ' + m.code);
            return m.messages;
        }, [state.locale]);

        // console.log('phnx.ApplicationProvider --> render...');
        return (
            <QueryClientProvider client={app.query}>
                <ctx.Provider value={{state, dispatch}}>
                    <IntlProvider
                        key={state.locale}
                        locale={state.locale}
                        timezone={state.timezone}
                        messages={_msg}
                        defaultLocale={defaultLocale}
                    // onError={onIntlError}
                    >
                        <RouterProvider router={app.router}/>
                    </IntlProvider>
                </ctx.Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    };

    const useApplicationContext = () => {
        const context = useContext(ctx);

        if(!context.state) {
            throw new Error('ApplicationProvider context is not set!');
        }

        const {
            // locale,
            defaultLocale,
            timeZone,
        } = useIntl();

        const updateTimezone = (tz: string) => context.dispatch({ type: 'tz', payload: tz});
        const updateLocale = (l: LocaleCode) => context.dispatch({ type: 'locale', payload: l});

        return {
            locale: context.state.locale,
            defaultLocale,
            timezone: timeZone,
            updateTimezone,
            updateLocale
        };
    };

    // <Context.Provider value={client}>{children}</Context.Provider>
    // return [ctx, ApplicationProvider] as const;
    return { ApplicationProvider, useApplicationContext };
}