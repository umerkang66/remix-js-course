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

export function loader() {
  // This will not send the component, but raw data
  // in the (Response json) format, technically that
  // is created by remix "json" function
  return DUMMY_EXPENSES;
}
