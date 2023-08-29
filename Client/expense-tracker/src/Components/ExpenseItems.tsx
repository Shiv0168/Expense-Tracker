import { Table } from 'react-bootstrap'
import IExpense from '../Modals/IExpenseItems'
import { format } from 'date-fns'

type ExpenseItemsModel = {
    expense: IExpense[]
}

const ExpenseItems = ({ expense }: ExpenseItemsModel) => {


    const dateToStrong = (date: Date) => {
        try {
            format(date, "yyyy-mm-dd");
        } catch (error) {
            return format(new Date(), "yyyy-mm-dd")
        }
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Expense description</th>
                        <th>Payee Name</th>
                        <th>Expense date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expense.map((data, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.expenseDescription}</td>
                                <td>{data.payeeName}</td>
                                <td>{dateToStrong(data.date)}</td>
                                <td>{data.price}</td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ExpenseItems