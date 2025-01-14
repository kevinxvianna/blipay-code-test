import { setupServer } from 'msw/node';
import { personHandlers, companyHandlers } from './handlers';

export const server = setupServer(...personHandlers, ...companyHandlers);
