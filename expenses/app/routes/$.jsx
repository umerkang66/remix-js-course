// SPLAT ROUTES

import { redirect } from '@remix-run/node';

// When no other route matches, this will be rendered

export function loader({ params }) {
  if ('/expenses'.includes(params['*'])) {
    return redirect('/expenses');
  }

  // first argument will be passed into the body of
  // response
  throw new Response('Not found', { status: 404 });
}
