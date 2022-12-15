// "Filename" and "Folder" should have the same name
// This will allow to add a layout component, that
// doesn't add a path in url

import { Outlet } from '@remix-run/react';

import ExpensesHeader from '~/components/navigation/expenses-header';
import expensesStyles from '~/styles/expenses.css';

// It is not "__app/expenses/...", instead it is the
// same "/expenses/..."

// PATHLESS LAYOUTS
export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

// This will shared by every component, that is in
// the "__app" file
export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}
