import { prisma } from './database.server';

export async function addExpense(expenseData) {
  try {
    // resolve value will be expense that is created
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getExpenses() {
  try {
    return await prisma.expense.findMany({
      orderBy: { date: 'desc' },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}
