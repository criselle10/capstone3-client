import React, { useEffect, useState,  useContext } from "react";
import {Table, Button} from 'react-bootstrap';
import UserContext from '../../UserContext';

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
            <h1>Categories</h1>
            <Button className='my-3' type='submit' variant='success' href='/categories/newCategory'>Add Category</Button>
            <Table striped bordered hover variant="dark" size="small">
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