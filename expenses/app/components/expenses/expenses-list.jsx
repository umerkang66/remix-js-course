import ExpenseListItem from './expense-list-item';

function ExpensesList({ expenses }) {
  return (
    <ol id="expenses-list">
      {expenses.map(expense => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
