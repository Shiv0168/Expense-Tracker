import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import getAllPayeeNames from '../Utils/ExpenseUtils'
import IExpense from '../Modals/IExpenseItems'
import { addExpenseItems } from '../Service/Expense'

type AddExpenseModel = {
    expenseItems: IExpense[],
    refreshNewAddExpenseAdded: (newExpenseItem: IExpense) => void;
}
const AddExpense = ({ expenseItems, refreshNewAddExpenseAdded }: AddExpenseModel) => {

    const names = getAllPayeeNames(expenseItems);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const payeeNameRef = useRef<HTMLSelectElement>(null);
    const expenseDescriptionRef = useRef<HTMLInputElement>(null);
    const payDateRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);



    const handleAddExepense = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const expenseDescription = (expenseDescriptionRef.current?.value as string);
        const payeeName = (payeeNameRef.current?.value as string);
        const amount = parseFloat((amountRef.current?.value as string));
        const expenseDate = new Date(payDateRef.current?.value as string);

        const newExpenseItem: IExpense = {
            expenseDescription: expenseDescription,
            payeeName: payeeName,
            price: amount,
            date: expenseDate
        }

        const response = await addExpenseItems(newExpenseItem);
        console.log(`Responnse is ${JSON.stringify(response)}`);
        refreshNewAddExpenseAdded(response);
        handleClose();

    }
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleAddExepense(e)}>
                        <Form.Group className="mb-3" controlId="expenseDescription">
                            <Form.Label>Expense Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter expense description.." ref={expenseDescriptionRef} />
                        </Form.Group>

                        <Form.Select aria-label="Default select example" ref={payeeNameRef}>
                            <option >Select Payee</option>
                            {names.map((name, index) => (
                                <option value="1" key={index}>{name}</option>
                            ))}
                        </Form.Select>

                        <Form.Group className="mb-3" controlId="expenseDate">
                            <Form.Label>Expense Date</Form.Label>
                            <Form.Control type="date" ref={payDateRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount.." ref={amountRef} />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Add expense
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddExpense