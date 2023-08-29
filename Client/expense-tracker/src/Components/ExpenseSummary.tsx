import { Table } from 'react-bootstrap'
import IExpense from '../Modals/IExpenseItems'
import getAllPayeeNames from '../Utils/ExpenseUtils'

type ExpenseSummaryModel = {
    expenseItems: IExpense[]
}
const ExpenseSummary = ({ expenseItems }: ExpenseSummaryModel) => {


    const getAllUniquePayeeNames = () => {
        return getAllPayeeNames(expenseItems);
    }

    const calculateTotalExpensesByPayee = (payeeName: string) => {
        let totalExpense: number = 0;

        expenseItems.forEach((expenseItem) => {
            if (expenseItem.payeeName === payeeName) {
                totalExpense += expenseItem.price;
            }
        })
        return totalExpense;
    }

    const calculateGrandTotal = () => {
        let grandTotal: number = 0;
        expenseItems.forEach((expense) => {
            grandTotal += expense.price;
        })
        return grandTotal;
    }

    const pendingAmount = (payeeName: string) => {
        const totalAmount: number = calculateGrandTotal();
        const amountPaidByPayee: number = calculateTotalExpensesByPayee(payeeName);

        const amountToEachPayee: number = totalAmount / getAllUniquePayeeNames().length;

        if (amountToEachPayee < amountPaidByPayee) {
            return 0;
        } else {
            return (amountToEachPayee - amountPaidByPayee);
        }
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Payee Name</th>
                        <th>Total Expenses</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getAllUniquePayeeNames().map((payeeName, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{payeeName}</td>
                                <td>{calculateTotalExpensesByPayee(payeeName)}</td>
                            </tr>
                        })
                    }
                    <tr>
                        <td></td>
                        <td>Grand Total :</td>
                        <td>{calculateGrandTotal()}</td>
                    </tr>
                </tbody>
            </Table>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Payee {`===>`} </th>
                        <th>price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getAllUniquePayeeNames().map((payeeName, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{payeeName}</td>
                                <td>{pendingAmount(payeeName)}</td>
                            </tr>
                        })
                    }
                    <tr>
                        <td></td>
                        <td>Grand Total :</td>
                        <td>{calculateGrandTotal()}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ExpenseSummary