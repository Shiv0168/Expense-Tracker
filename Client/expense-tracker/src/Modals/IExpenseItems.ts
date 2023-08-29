export default interface IExpense {
  expenseDescription: string;
  payeeName: string;
  price: number;
  date: Date;
  id?: number;
}
