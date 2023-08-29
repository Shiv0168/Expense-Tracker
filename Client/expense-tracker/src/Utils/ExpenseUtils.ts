import IExpense from "../Modals/IExpenseItems";

const getAllPayeeNames = (expenseItems: IExpense[]) => {
  const uniquePayeeNames: string[] = [];
  expenseItems.forEach((name) => {
    const payeeName = name.payeeName;

    if (!uniquePayeeNames.includes(payeeName)) {
      uniquePayeeNames.push(payeeName);
    }
  });
  return uniquePayeeNames;
};

export default getAllPayeeNames;
