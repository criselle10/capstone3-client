import React, { useEffect, useState,  useContext } from "react";
import {Table, Button} from 'react-bootstrap';
import UserContext from '../../UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from './categories.module.css';

export default function Categories() {

	const {user} = useContext(UserContext) 

	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		fetch("https://guarded-escarpment-99106.herokuapp.com/api/categories", {
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
            <h3 className={styles.categories} >Categories</h3>
            <Button className={styles.addcategoryBtn} type='submit' variant='success' href='/categories/newCategory'> <FontAwesomeIcon icon={faPlus} /> Add </Button>
            <Table striped bordered hover variant="dark" >
                <thead className={styles.categoriesTableHead}>
                    <tr>
                        <th className={styles.catHeader}>Category</th>
                        <th className={styles.catHeader}>Type</th>
                    </tr>
                </thead>     
                <tbody className={styles.cattableBody}>
                    {listOfCategories}
                </tbody>
            </Table>
        </React.Fragment>       
	);
}