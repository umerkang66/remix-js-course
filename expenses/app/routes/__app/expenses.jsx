// If there is also a fine with the same name as folder, this acts as layout file for that folder route
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/expenses-list';
import { getExpenses } from '~/data/expenses.server';

export default function ExpensesLayout() {
  // This data is serialized, doesn't contains any
  // complex objects
  const expenses = useLoaderData();

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
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

// "Loader" must return a "Response" instance,
// if we return simple obj, remix will automatically
// convert it into response, using "json" function
export function loader() {
  // This returns a promise, that will automatically
  // resolved
  return getExpenses();
}
