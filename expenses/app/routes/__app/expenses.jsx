// If there is also a fine with the same name as folder, this acts as layout file for that folder route
import { Link, Outlet } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/expenses-list';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'First Expense',
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: 'e2',
    title: 'Second Expense',
    amount: 12.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesLayout() {
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
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
