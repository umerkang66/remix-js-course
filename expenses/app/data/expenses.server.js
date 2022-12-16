import { prisma } from './database.server';

export async function addExpense(expenseData, userId) {
  try {
    // resolve value will be expense that is created
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        // connect this expense, with the existing
        // user that has this id
        User: { connect: { id: userId } },
      },
    });
  } catch (err) {
    console.log('✨✨✨', err);
    throw new Error('Failed to add the expense');
  }
}

export async function getExpenses(userId) {
  try {
    return await prisma.expense.findMany({
      orderBy: { date: 'desc' },
      where: { userId },
    });
  } catch (err) {
    console.log('✨✨✨', err);
    throw new Error('Failed to updated expenses');
  }
}

export async function getExpense(id) {
  // we are currently not using this
  try {
    return await prisma.expense.findFirst({ where: { id } });
  } catch (err) {
    console.log('✨✨✨', err);
    throw new Error('Failed to get the expense');
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (err) {
    console.log('✨✨✨', err);
    throw new Error('Failed to updated the expense');
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({ where: { id } });
  } catch (err) {
    console.log('✨✨✨', err);
    throw new Error('Failed to delete the expense');
  }
}
