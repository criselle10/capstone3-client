import React, { useEffect, useState,  useContext } from "react";
import {Table, Button} from 'react-bootstrap';
import UserContext from '../../UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';

export default function Categories() {

	const {user} = useContext(UserContext) 

	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/api/categories", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setAllCategories(data);
        });
	}, []);
    
    const listOfCategories =  allCategories.map(category => {
        return (
            <tr key={category.name}>
                <td>{category.name}</td>
                <td>{category.type}</td>
            </tr>
        )
    })

	return (
        <React.Fragment>
            <h3 className='mt-4 mb-3' >Categories</h3>
            <Button className='my-2' type='submit' variant='success' href='/categories/newCategory'> <FontAwesomeIcon icon={faPlus} /> Add </Button>
            <Table striped bordered hover variant="dark" >
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Type</th>
                    </tr>
                </thead>     
                <tbody>
                    {listOfCategories}
                </tbody>
            </Table>
        </React.Fragment>       
	);
}