import { HttpResponse, http } from 'msw';

export const personHandlers = [
  http.post('http://localhost:3005/credit-score/person', () => {
    const status = Math.random() < 0.5 ? 'APPROVED' : 'DENIED';

    return HttpResponse.json({
      status: status,
      ...(status === 'APPROVED'
        ? { amount: Math.floor(Math.random() * 10000) }
        : {}),
    });
  }),
];
