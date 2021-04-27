import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {Form, Button, Card} from 'react-bootstrap';
import Router from 'next/router';
import styles from './categories.module.css';

export default function AddCategory(){
    
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if(name !== '' && type !== ''){
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    }, [name, type])
    
    function addCategory(e){
        e.preventDefault()

        let token = localStorage.getItem('token');
        fetch('https://guarded-escarpment-99106.herokuapp.com/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                type: type
            })
        })
        .then(res => res.json())
        .then(data => {
            
            if(data){

                Swal.fire({
                    icon: "success",
                    title: "Category Saved",
                    // text: "Thank you for adding category."
                })
                Router.push('/categories')
            }else {   
                Swal.fire({
                    icon: "error",
                    title: "Please Try Again",
                    // text: "Failed adding category."
                })
            }      
        })

        setName('');
        setType('');
    }

    return (
        <React.Fragment>
            <div className={styles.newCategoryBody}>
                <h1 className={styles.newCategory}>[ New Category ]</h1>
                <Card className={styles.cardBody}>
                    <Card.Body>
                        <Form onSubmit={ e => addCategory(e)}>
                            <Form.Group controlId="name">
                                <Form.Label className={styles.label1}>Category Name:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="type">
                                <Form.Label className={styles.label2}>Category Type:</Form.Label>
                                <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)} required>
                                    <option disabled value=''>Select Category Type</option>
                                    <option>Income</option>
                                    <option>Expense</option>
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' className={styles.addButton}>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    )
}

// {
//     isActive
//     ? <Button type='submit' variant='primary'>Submit</Button>
//     : <Button type='submit' variant='danger' disabled>Submit</Button>
// }