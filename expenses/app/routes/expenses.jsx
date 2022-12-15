// If there is also a fine with the same name as folder, this acts as layout file for that folder route
import { Outlet } from '@remix-run/react';

export default function ExpensesLayout() {
  return (
    <main>
      <p>Shared Layout</p>
      <Outlet />
    </main>
  );
}
