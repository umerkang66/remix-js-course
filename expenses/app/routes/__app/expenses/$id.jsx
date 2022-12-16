import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

import ExpenseForm from '~/components/expenses/expense-form';
import Modal from '~/components/util/modal';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function UpdateExpensePage() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate('..')}>
      <ExpenseForm />
    </Modal>
  );
}

// We have already all expenses data, so getting a
// single expense is redundant
/* export async function loader({ params: { id } }) {
  return getExpense(id);
} */

export async function action({ params: { id }, request }) {
  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const updatedExpense = Object.fromEntries(formData);

    try {
      validateExpenseInput(updatedExpense);
    } catch (err) {
      // technically this err obj
      // (validationErrorsObject) is obtained from
      // validation.server.js
      return err;
    }

    await updateExpense(id, updatedExpense);
    return redirect('..');
  } else if (request.method === 'DELETE') {
    // NOTE: currently we are not using this
    const expense = await deleteExpense(id);
    return { id: expense.id };
  }
}
