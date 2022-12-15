import {
  Form,
  Link,
  useActionData,
  useTransition as useNavigation,
} from '@remix-run/react';

export default function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const { state } = useNavigation();
  // "idle" means everything is normal, if state is
  // not idle, means something is happening
  const isSubmitting = state !== 'idle';

  // This will coming from "action" function of add.jsx
  const validationErrors = useActionData();

  // technically if it is the same path, "action"
  // is not required
  return (
    <Form action="." method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Expense'}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}
