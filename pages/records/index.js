import React, { useEffect, useState,  useContext } from "react";
import {Card, Button, InputGroup, FormControl, Form, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';

export default function Records() {

	const [allTransaction, setAllTransaction] = useState([]);
	const [savings, setSavings] = useState([]);
	const [expense, setExpense] = useState(0);
	const [income, setIncome] = useState(0);
	const [totalBudget, setTotalBudget] = useState(0);
	const [allExpense, setAllExpense] = useState([]);
	const [allIncome, setAllIncome] = useState([]);
	const [type, setType] = useState("All");

	useEffect(() => {
		let token = localStorage.getItem("token");
		fetch("https://guarded-escarpment-99106.herokuapp.com/api/records/",{
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setAllTransaction(data);
			const ListOfIncomeTransaction = data.filter(value => value.type === 'Income');
			const ListOfExpenseTransaction = data.filter(value => value.type === 'Expense');
			const totalExpense = ListOfExpenseTransaction.reduce((a, b) => +a + +b.amount, 0)
			const totalIncome = ListOfIncomeTransaction.reduce((a, b) => +a + +b.amount, 0)
			setExpense(totalExpense);
			console.log(totalExpense)
			setIncome(totalIncome);
			console.log(totalIncome)
			setTotalBudget(totalIncome - totalExpense);
			

			data.map(data => {
				console.log(data)
				if(data.type === 'Income'){
					setAllIncome(allIncome => [...allIncome, data])
				}else{
					setAllExpense(allExpense => [...allExpense, data])
				}
			})

			fetch("https://guarded-escarpment-99106.herokuapp.com/api/users/details/",{
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

	const aTransaction = allTransaction.slice(0).reverse().map(data => {
		const ListOfIncomeTransaction = allTransaction.filter(value => value.dateOfTransaction <= data.dateOfTransaction && value.type === 'Income');
		const ListOfExpenseTransaction = allTransaction.filter(value => value.dateOfTransaction <= data.dateOfTransaction && value.type === 'Expense');
		const totalIncome = ListOfIncomeTransaction.reduce((a, b) => +a + +b.amount, 0);
		const totalExpense = ListOfExpenseTransaction.reduce((a, b) => +a + +b.amount, 0);

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
							<span className="text-success">Income <span className='text-dark'>({data.name})</span></span>
							</h6>
							<p>{dateString}</p>
						</Col>
						<Col className="col-6 text-right">
							<h6 className="text-success">+ {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h6>
							<span className="text-success">{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
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
									<span className="text-danger">Expense <span className='text-dark'>({data.name})</span></span>
								</h6>
								<p>{dateString}</p>
							</Col>
							<Col className="col-6 text-right">
								<h6 className="text-danger"> - {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h6>
								<span className="text-danger">{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			)
		}	
	})

	let listOfIncome = allIncome.slice(0).reverse().map(data => {

		const ListOfIncomeTransaction = allIncome.filter(value => value.dateOfTransaction <= data.dateOfTransaction && value.type === 'Income');
		
		const totalIncome = ListOfIncomeTransaction.reduce((a, b) => +a + +b.amount, 0);

		let dateObject = new Date(data.createdOn);
	   	let dateString = JSON.stringify(dateObject.toUTCString());
	   	dateString = dateString.substring(1, dateString.length - 13);

		return(
			<Card key={data._id} className='mt-3'>
				<Card.Body>
					<Row>
						<Col className="col-6">
							<h5>{data.description}</h5>
							<h6>
								<span className="text-success">Income <span className='text-dark'>({data.name})</span></span>
								<p>{dateString}</p>
							</h6>
						</Col>
						<Col className="col-6 text-right">
							<h6 className="text-success">+ {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h6>
							<span className="text-success">{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		)
   	})

   	let listOfExpense = allExpense.slice(0).reverse().map(data => {
		const ListOfExpenseTransaction = allExpense.filter(value => value.dateOfTransaction <= data.dateOfTransaction && value.type === 'Expense');
		const totalExpense = ListOfExpenseTransaction.reduce((a, b) => +a + +b.amount, 0);

		let dateObject = new Date(data.createdOn);
		let dateString = JSON.stringify(dateObject.toUTCString());
		dateString = dateString.substring(1, dateString.length - 13);

		return(
			<Card key={data._id} className='mt-3'>
				<Card.Body>
					<Row>
						<Col className="col-6">
							<h5>{data.description}</h5>
							<h6>
								<span className="text-danger ">Expense <span className='text-dark'>({data.name})</span></span>
								
							</h6>
							<h6>
								{dateString}
							</h6>
						</Col>
						<Col className="col-6 text-right">
							<h6 className="text-danger"> - {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h6>
							<span className="text-danger">{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
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
			</div>
			<div className='row text-center mb-4'>
				<div className='col-4'>
					<h5>Total Income: {income.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
				</div>
				<div className='col-4'>
					<h5>Total Expense: {expense.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>	
				</div>	
				<div className='col-4'>
					<h5>Current Savings: {totalBudget.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
				</div>
			</div>
			<InputGroup>
				<InputGroup.Prepend>
                <Button type="submit" variant="primary	" href='/records/newRecord'> <FontAwesomeIcon icon={faPlus} /> Add </Button>
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