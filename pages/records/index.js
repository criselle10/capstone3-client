import React, { useEffect, useState,  useContext } from "react";
import {Table, Button} from 'react-bootstrap';
import UserContext from '../../UserContext';

export default function Records() {

	const {user} = useContext(UserContext);

	const [allRecords, setAllRecords] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/api/record", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setAllCategories(data);
        });
	}, []);
    
    const listOfRecords =  allRecords.map(record => {
        return (
            <tr key={record.name}>
                <td>{category.name}</td>
                <td>{category.type}</td>
            </tr>
        )
    })

	return (
        <React.Fragment>
            <h1 className='mt-5'>Records</h1>
            <Button className='my-3' type='submit' variant='success' href='/records/newRecord'>Add Record</Button>
            <Table striped bordered hover variant="dark" size="small">
                <thead>
                </thead>     
                <tbody>
                </tbody>
            </Table>
        </React.Fragment>       
	);
}