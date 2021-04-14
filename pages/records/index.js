import React, { useEffect, useState,  useContext } from "react";
import {Card, Button, InputGroup, FormControl, Form} from 'react-bootstrap';
import styles from '../../styles/main.module.css';
import UserContext from '../../UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';

export default function Records() {

	const {user} = useContext(UserContext);

    const [name, setName] = useState('');
    const [type, setType] = useState('');

	const [allRecords, setAllRecords] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/api/records", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setAllRecords(data);
        });
	}, []);
    
    const listOfRecords =  allRecords.map(record => {
        return (
            <React.Fragment>
                <Card key={record.name}>
                    <Card.Body>
                        {record.name}

                        {record.type}
                        {record.amount}
                        {record.description}
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    })

	return (
        <React.Fragment>
            <h4 className='mt-5 mb-3'>Records</h4>
            <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <Button type="submit" variant="primary" href='/records/newRecord'><FontAwesomeIcon icon={faPlus}/> Add </Button>
            </InputGroup.Prepend>
            <FormControl 
                type="text"
                placeholder="Search Record"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)} required>
                <option value=''>All</option>
                <option>Income</option>
                <option>Expense</option>
            </Form.Control>
            </InputGroup>
            <Card>
                <Card.Body>{listOfRecords}</Card.Body>
            </Card>
        </React.Fragment>       
	);
}