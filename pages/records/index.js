import React, { useEffect, useState,  useContext } from "react";
import {Card, Button, InputGroup, FormControl, Form, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from './records.module.css';

export default function Records() {

	const [allTransaction, setAllTransaction] = useState([]);
	const [savings, setSavings] = useState([]);
	const [expense, setExpense] = useState(0);
	const [income, setIncome] = useState(0);
	const [totalBudget, setTotalBudget] = useState(0);
	const [allExpense, setAllExpense] = useState([]);
	const [allIncome, setAllIncome] = useState([]);
	const [type, setType] = useState("All");
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		let token = localStorage.getItem("token");
		fetch("https://guarded-escarpment-99106.herokuapp.com/api/records/",{
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setAllTransaction(data);
			const ListOfIncomeTransaction = data.filter(value => value.type === 'Income');
			const ListOfExpenseTransaction = data.filter(value => value.type === 'Expense');
			const totalExpense = ListOfExpenseTransaction.reduce((a, b) => +a + +b.amount, 0)
			const totalIncome = ListOfIncomeTransaction.reduce((a, b) => +a + +b.amount, 0)
			setExpense(totalExpense);
			setIncome(totalIncome);
			setTotalBudget(totalIncome - totalExpense);

			data.map(data => {
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

	useEffect(() => {

		if(search === ''){return null}

		
		if(type === 'All'){

			let tempResult = allTransaction.filter(record => record.description.toLowerCase().includes(search.toLowerCase()))
			setSearchResult(tempResult)

		}else if(type === 'Income'){

			let tempResult = allIncome.filter(record => record.description.toLowerCase().includes(search.toLowerCase()))
			setSearchResult(tempResult)

		}else if(type === 'Expense'){

			let tempResult = allExpense.filter(record => record.description.toLowerCase().includes(search.toLowerCase()))
			setSearchResult(tempResult)
		}
	

	}, [search])

	const allSearch = searchResult.slice(0).reverse().map(data => {
		let dateObject = new Date(data.createdOn);
		let dateString = JSON.stringify(dateObject.toUTCString());
		dateString = dateString.substring(1, dateString.length - 13);

		if (data.type === 'Income'){

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
		}else{
							
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
		}	
	})

	return (
        <React.Fragment>
			<div className={styles.recordbody}>
				<div className='row' >
					<h1 className={styles.records}>[ Records ]</h1>
				</div>
				<div className={styles.computation}>
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
						<Button type="submit" className={styles.newRecordButten} href='/records/newRecord'> <FontAwesomeIcon icon={faPlus} /> New Record </Button>
					</InputGroup.Prepend>
					<FormControl
						type="text"
						placeholder="Search Record"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					
					<Form.Control
						as="select"
						onChange={(e) => setType(e.target.value)}
						required
					>
						<option>All</option>
						<option>Income</option>
						<option>Expense</option>
					</Form.Control>
				</InputGroup>
				{	
					search !== ''
					?
					allSearch
					:
					type == 'All'
					?
						aTransaction
					:
					type == 'Income'
					?
						listOfIncome
					:
						listOfExpense
				}
			</div>
		</React.Fragment>       
	);
}