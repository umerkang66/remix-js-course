import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';

export async function loader({ request }) {
  // because this will "throw" the "redirect", there is nothing else we have to do
  const userId = await requireUserSession(request);

  // This will not send the component, but raw data
  // in the (Response json) format, technically that
  // is created by remix "json" function
  return getExpenses(userId);
}
