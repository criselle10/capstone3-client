import React, { useEffect, useState,  useContext } from "react";
import {Card, Button, InputGroup, FormControl, Form, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';

export default function Records() {

	const [allTransaction, setAllTransaction] = useState([]);
	const [savings, setSavings] = useState([]);
	const [expense, setExpense] = ([]);
	const [income, setIncome] = ([]);
	const [allExpense, setAllExpense] = useState([]);
	const [allIncome, setAllIncome] = useState([]);
	const [type, setType] = useState("All");

	useEffect(() => {
		let token = localStorage.getItem("token");
		fetch("http://localhost:4000/api/records/",{
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setAllTransaction(data);

			data.map(data => {
				if(data.type === 'Income'){
					setAllIncome(allIncome => [...allIncome, data])
				}else{
					setAllExpense(allExpense => [...allExpense, data])
				}
			})

			fetch("http://localhost:4000/api/users/details/",{
			headers: {
				"Authorization": `Bearer ${token}`
			}
			})
			.then(res => res.json())
			.then(data => {
				setSavings(data.savings)
			})
		})
	}, [])

	// useEffect(() )

	const aTransaction = allTransaction.slice(0).reverse().map(data => {
		// const ListOfIncomeTransaction = allTransaction.filter(value => value.dateOfTransaction <= data.dateOfTransaction && value.type === 'Income');
		// const ListOfExpenseTransaction = allTransaction.filter(value => value.dateOfTransaction <= data.dateOfTransaction && value.type === 'Expense');
		// const totalIncome = ListOfIncomeTransaction.reduce((a, b) => +a + +b.amount, 0);
		// const totalExpense = ListOfExpenseTransaction.reduce((a, b) => +a + +b.amount, 0);

		let dateObject = new Date(data.createdOn);
		let dateString = JSON.stringify(dateObject.toUTCString());
		dateString = dateString.substring(1, dateString.length - 13);

		if (data.type === 'Income'){

			return(
				<Card key={data._id} className='mt-3' border="success">
				<Card.Body>
					<Row>
						<Col className="col-6">
							<h5>{data.description}</h5>
							<h6>
								<span className="text-success">Income</span>
							</h6>
							<p>{dateString}</p>
						</Col>
						<Col className="col-6 text-right">
							<h6 className="text-success">+ {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h6>
						</Col>
					</Row>
				</Card.Body>
			</Card>
			)
		}else{
			
			return(
				<Card key={data._id} className='mt-3' border="danger">
					<Card.Body>
						<Row>
							<Col className="col-6">
								<h5>{data.description}</h5>
								<h6>
									<span className="text-danger">Expense</span>
								</h6>
								<p>{dateString}</p>
							</Col>
							<Col className="col-6 text-right">
								<h6 className="text-danger"> - {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h6>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			)
		}	
	})

	let listOfIncome = allIncome.slice(0).reverse().map(data => {

		let dateObject = new Date(data.createdON);
	   	let dateString = JSON.stringify(dateObject.toUTCString());
	   	dateString = dateString.substring(1, dateString.length - 13);

		return(
			<Card key={data._id} className='mt-3'>
				<Card.Body>
					<Row>
						<Col className="col-6">
							<h5>{data.description}</h5>
							<h6>
								<span className="text-success">Income</span>
								<p>{dateString}</p>
							</h6>
						</Col>
						<Col className="col-6 text-right">
							<h6 className="text-success">+ {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h6>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		)
   	})

   	let listOfExpense = allExpense.slice(0).reverse().map(data => {

		let dateObject = new Date(data.createdON);
		let dateString = JSON.stringify(dateObject.toUTCString());
		dateString = dateString.substring(1, dateString.length - 13);

		return(
			<Card key={data._id} className='mt-3'>
				<Card.Body>
					<Row>
						<Col className="col-6">
							<h5>{data.description}</h5>
							<h6>
								<span className="text-danger">Expense</span>
								<p>{dateString}</p>	
							</h6>
							
						</Col>
						<Col className="col-6 text-right">
							<h6 className="text-danger"> - {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h6>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		)
	})	
	return (
        <React.Fragment>
			<div className='row' >
				<h3 className='col-md-12 col-lg-6 my-4'>Records</h3>
				<h3 className='col-md-12 col-lg-6 my-4'>Total Savings: {savings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
			</div>
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
					onChange={e => setType(e.target.value)}
					required
				>
					<option>All</option>
					<option>Income</option>
					<option>Expense</option>
				</Form.Control>
			</InputGroup>
			{type == 'All'
			?
				aTransaction
			:
			type == 'Income'
			?
				listOfIncome
			:
				listOfExpense
			}
		</React.Fragment>       
	);
}