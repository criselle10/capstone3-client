import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {Form, Button, Card, Row, Col} from 'react-bootstrap';
import Router from 'next/router';
import styles from './records.module.css';

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
        fetch('https://guarded-escarpment-99106.herokuapp.com/api/categories/', {
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
        fetch('https://guarded-escarpment-99106.herokuapp.com/api/records', {
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

                fetch('https://guarded-escarpment-99106.herokuapp.com/api/users/savingsUpdate', {
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
                            // text: "Thank you for adding record."
                        })
                        Router.push('/records')
                    }else {
                        Swal.fire({
                            icon: "error",
                            title: "Please Try Again",
                            // text: "Failed adding record."
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
            <div className={styles.newRecordBody}>
                <h1 className={styles.newReord}>[ New Record ]</h1>
                <Card className={styles.addRecordForm}>
                    <Card.Body>
                        <Form onSubmit={ e => addRecord(e)}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="type">
                                    <Form.Label className={styles.label}>Category Type:</Form.Label>
                                    <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)} required>
                                        <option disabled value=''>Select Category Type</option>
                                        <option>Income</option>
                                        <option>Expense</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="name">
                                    <Form.Label className={styles.label}>Category Name:</Form.Label>
                                    <Form.Control as="select" value={name} onChange={(e) => setName(e.target.value)} required>
                                        <option disabled value=''>Select Category Name</option>
                                        {displayCategory}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="amount">
                                <Form.Label className={styles.label}>Amount:</Form.Label>
                                <Form.Control 
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
m                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label className={styles.label}>Description:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {
                                isActive
                                ? <Button type='submit' className={styles.recordButton}>Submit</Button>
                                : <Button type='submit' disabled className={styles.recordButton}>Submit</Button>
                            }
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    )
}
