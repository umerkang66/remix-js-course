import { json } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import Chart from '~/components/expenses/chart';
import ExpenseStatistics from '~/components/expenses/expense-statistics';
import Error from '~/components/util/error';
import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';

export default function ExpenseAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }) {
  // because this will "throw" the "redirect", there is nothing else we have to do
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || !expenses.length) {
    throw json(
      { message: 'Could not load data for the requested analysis.' },
      { status: 404, statusText: 'No expenses found' }
    );
  }

  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <main>
      <Error title={caughtResponse.statusText + ': ' + caughtResponse.status}>
        <p>{caughtResponse.data?.message || 'Something went wrong'}</p>
      </Error>
    </main>
  );
}
