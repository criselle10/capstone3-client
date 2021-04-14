import React, { useEffect, useState,  useContext } from "react";
import {Card, Button, InputGroup, FormControl, Form} from 'react-bootstrap';
import styles from '../../styles/main.module.css';
import UserContext from '../../UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import Records from "./../../components/Records";

export default function records() {

	return (
        <React.Fragment>
			<h1>Records</h1>
			<InputGroup>
				<InputGroup.Prepend>
                <Button type="submit" variant="primary" href='/records/newRecord'> <FontAwesomeIcon icon={faPlus} /> Add </Button>
				</InputGroup.Prepend>
				<FormControl
					// id=""
					placeholder="Search Record"
				/>
				<Form.Control
					as="select"
					// value={}
					// onChange={e => setType(e.target.value)}
					required
				>
					<option>All</option>
					<option>Income</option>
					<option>Expense</option>
				</Form.Control>
			</InputGroup>
			<Records />
		</React.Fragment>       
	);
}