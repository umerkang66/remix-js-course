import { getExpenses } from '~/data/expenses.server';

export function loader() {
  // This will not send the component, but raw data
  // in the (Response json) format, technically that
  // is created by remix "json" function
  return getExpenses();
}
