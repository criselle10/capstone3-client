import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {Form, Button, Card} from 'react-bootstrap';
import Router from 'next/router';

export default function AddRecord(){
    
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if(name !== '' && type !== '' && amount !== '' && description !== ''){
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    }, [name, type, amount, description])
    
    function addRecord(e){
        e.preventDefault()

        let token = localStorage.getItem('token');
        fetch('http://localhost:4000/api/record', {
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
            console.log(data)
            
            if(data){
                console.log(data)
                Swal.fire({
                    icon: "success",
                    title: "Record Saved",
                    text: "Thank you for adding record."
                })
                Router.push('/record')
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
            <h1 className='my-5'>New Record</h1>
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
                                <option>List category</option>
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
                        <Button type='submit' variant='primary'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

// {
//     isActive
//     ? <Button type='submit' variant='primary'>Submit</Button>
//     : <Button type='submit' variant='danger' disabled>Submit</Button>
// }