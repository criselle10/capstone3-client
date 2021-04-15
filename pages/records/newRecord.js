import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {Form, Button, Card} from 'react-bootstrap';
import Router from 'next/router';
import styles from '../../styles/main.module.css';

export default function AddRecord(){
    
    const [categoryList, setCategoryList] = useState("");
    const [incomeCategoryList, setIncomeCategoryList] = useState("");
    const [expenseCategoryList, setExpenseCategoryList] = useState("");
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [displayCategory, setDisplayCategory] = useState('')

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/api/categories/', {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
             }
        })
        .then(res => res.json())
        .then(data => {
            setCategoryList(data.map((arr) => {
                return {name: arr.name, type: arr.type}
            }))

            let incomeList = data.filter(arr => {
                if(arr.type === "Income"){
                    return arr
                }
            })

            let expenseList = data.filter(arr => {
                if(arr.type === "Expense") {
                    return arr
                }
            })

            setIncomeCategoryList(incomeList.map((arr) => {
                return {name: arr.name}
            }))

            setExpenseCategoryList(expenseList.map((arr) => {
                return {name: arr.name}
            }))
        })
    }, [])

    useEffect(() => {

        function categoryNames(arr) {
            return arr.map( e => {
                return  <option value={e.name} key={e.name}>{e.name}</option>
            })
        }
        if(type === "Income"){
            setDisplayCategory(
                categoryNames(incomeCategoryList)
            )
        }
        if(type === "Expense"){
            setDisplayCategory(
                categoryNames(expenseCategoryList)
            )
        }

        setName("")

    }, [type])
    useEffect(() => {

        if(name !== '' && type !== '' && amount !== '' && description !== ''){
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    }, [type, name, amount, description])
    
    function addRecord(e){
        e.preventDefault()

        let token = localStorage.getItem('token');
        fetch('http://localhost:4000/api/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                type: type,
                amount: amount,
                description: description
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data){

                fetch('http://localhost:4000/api/users/savingsUpdate', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if(data){
                        Swal.fire({
                            icon: "success",
                            title: "Record Saved",
                            text: "Thank you for adding record."
                        })
                        Router.push('/records')
                    }else {
                        Swal.fire({
                            icon: "error",
                            title: "Please Try Again",
                            text: "Failed adding record."
                        })
                    }
                    
                })
            }else {   
                Swal.fire({
                    icon: "error",
                    title: "Please Try Again",
                    text: "Failed adding record."
                })
            }      
        })

        setName('');
        setType('');
        setAmount('');
        setDescription('');
    }

    return (
        <React.Fragment>
            <h4 className='mt-5 mb-3'>New Record</h4>
            <Card>
                <Card.Body>
                    <Form onSubmit={ e => addRecord(e)}>
                        <Form.Group controlId="type">
                            <Form.Label>Category Type:</Form.Label>
                            <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)} required>
                                <option disabled value=''>Select Category Type</option>
                                <option>Income</option>
                                <option>Expense</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>Category Name:</Form.Label>
                            <Form.Control as="select" value={name} onChange={(e) => setName(e.target.value)} required>
                                <option disabled value=''>Select Category Name</option>
                                {displayCategory}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="amount">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control 
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control 
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {
                            isActive
                            ? <Button type='submit'>Submit</Button>
                            : <Button type='submit' disabled>Submit</Button>
                        }
                    </Form>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}
