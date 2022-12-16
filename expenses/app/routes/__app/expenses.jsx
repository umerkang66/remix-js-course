// If there is also a fine with the same name as folder, this acts as layout file for that folder route

import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/expenses-list';
import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';

export default function ExpensesLayout() {
  // This data is serialized, doesn't contains any
  // complex objects
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Get Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

// "Loader" must return a "Response" instance,
// if we return simple obj, remix will automatically
// convert it into response, using "json" function
export async function loader({ request }) {
  // because this will "throw" the "redirect", there is nothing else we have to do
  const userId = await requireUserSession(request);

  // This returns a promise, that will automatically
  // resolved
  return getExpenses(userId);
}
