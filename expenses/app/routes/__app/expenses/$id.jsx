import { useNavigate } from '@remix-run/react';

import ExpenseForm from '~/components/expenses/expense-form';
import Modal from '~/components/util/modal';

export default function ExpensePage() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate('..')}>
      <ExpenseForm />;
    </Modal>
  );
}
