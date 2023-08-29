import { useEffect, useState } from "react"
import { getAllExpenseItems } from '../Service/Expense'
import ExpenseItems from "./ExpenseItems"
import IExpense from "../Modals/IExpenseItems"
import { Container } from "react-bootstrap"
import ExpenseSummary from "./ExpenseSummary"
import AddExpense from "./AddExpense"

const ExpenseTracker = () => {

    const [expense, setExpense] = useState<IExpense[]>([]);

    useEffect(() => {
        const getAllExpenseInvoker = async () => {
            const response = await getAllExpenseItems();
            setExpense(response);
        }
        getAllExpenseInvoker();
    }, [])

    const refreshNewAddExpenseAdded = (xpense: IExpense) => {
        console.log("Hello")
        setExpense([xpense, ...expense]);
    }

    return (
        <Container className="my-3">
            <div className="float-right my-3">
                <AddExpense expenseItems={expense} refreshNewAddExpenseAdded={refreshNewAddExpenseAdded} />
            </div>
            <ExpenseItems expense={expense} />
            <ExpenseSummary expenseItems={expense} />
        </Container>
    )
}

export default ExpenseTracker