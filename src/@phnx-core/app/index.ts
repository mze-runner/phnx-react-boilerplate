import { createCtx } from './createApplicationProvider.tsx';
import { createApplication } from './createApplication.ts';

const { ApplicationProvider, useApplicationContext} = createCtx();

// export { useApplicationContext } from './useApplicationContext.ts';
export default ApplicationProvider;
export { useApplicationContext, createApplication };