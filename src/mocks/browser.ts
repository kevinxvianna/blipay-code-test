import { setupWorker } from 'msw/browser';

import { personHandlers, companyHandlers } from './handlers';

export const worker = setupWorker(...personHandlers, ...companyHandlers);
