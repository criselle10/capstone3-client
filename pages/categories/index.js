import React, { useEffect, useState,  useContext } from "react";
import {Table, Button} from 'react-bootstrap';
import UserContext from '../../UserContext';

export default function Categories() {

	const {user} = useContext(UserContext) 

	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/api/categories")
			.then(res => res.json())
			.then(data => {
                console.log(data)
				setAllCategories(data);
			});
	}, []);

    // const categories = allCategories.map(category => {
	// 	return (
	// 		<Course key={category._id} categoryProp={category} />
	// 	);
	// });
    
    const listOfCategories =  allCategories.map(category => {
        return (
            <tr>
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