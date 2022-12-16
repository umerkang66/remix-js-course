import {
  Form,
  Link,
  useActionData,
  useMatches,
  useParams,
  useTransition as useNavigation,
} from '@remix-run/react';

export default function ExpenseForm() {
  // This will coming from "action" function of add.jsx
  const validationErrors = useActionData();

  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const { state } = useNavigation();
  // "idle" means everything is normal, if state is
  // not idle, means something is happening
  const isSubmitting = state !== 'idle';

  const params = useParams();

  // getting data from parent route (expenses route) loader
  const matches = useMatches();
  const EXPENSE_ROUTE_ID = 'routes/__app/expenses';

  const expenseData = matches
    .find(match => match.id === EXPENSE_ROUTE_ID)
    .data.find(
      // currentRoute also has params that has current
      // expense id
      dataEl => dataEl.id === params.id
    );

  if (params.id && !expenseData) {
    // "id" exist, but data is not, means "id" is fake

    return <p>Invalid expense id</p>;
  }

  // because in the "add" route, expense data is not
  // defined
  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: '',
        amount: '',
        date: '',
      };

  // technically if it is the same path, "action"
  // is not required
  return (
    <Form
      action="."
      // if expense data is available, we are updating
      method={expenseData ? 'patch' : 'post'}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
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
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ''
            }
          />
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
