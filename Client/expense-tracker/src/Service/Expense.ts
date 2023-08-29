import axios from "axios";
import IExpense from "../Modals/IExpenseItems";

const baseUrl: string = "http://localhost:4000";

const getAllExpenseItems = async () => {
  const response = await axios.get<IExpense[]>(`${baseUrl}/items`);
  return response.data;
};

const addExpenseItems = async (expenseData: IExpense) => {
  const response = await axios.post<IExpense>(`${baseUrl}/items`, expenseData);
  return response.data;
};

export { getAllExpenseItems, addExpenseItems };
