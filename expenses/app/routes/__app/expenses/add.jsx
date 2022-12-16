import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

import ExpenseForm from '~/components/expenses/expense-form';
import Modal from '~/components/util/modal';
import { addExpense } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function AddExpensePage() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate('..')}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({ request }) {
  // when non-get request reaches this route, it
  // will hit
  const userId = await requireUserSession(request);

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (err) {
    // technically this err obj
    // (validationErrorsObject) is obtained from
    // validation.server.js
    return err;
  }

  await addExpense(expenseData, userId);
  return redirect('..');
}
