import React, { useEffect, useState, useContext } from "react";
import { InputGroup, Form, FormControl, Button, Card, Row, Col } from "react-bootstrap";

export default function Records() {

	const [allTransaction, setAllTransaction] = useState([])
	const [savings, setSavings] = useState([])
	const [totalSavings, setTotalSavings] = useState(0)

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
  
	const aTransaction = allTransaction.map(data => {
		const ListOfCurrentTransaction = allTransaction.filter(value => value.dateOfTransaction <= data.dateOfTransaction && value.type === data.type);

		if (data.type === 'Income'){
			const totalIncome = ListOfCurrentTransaction.reduce((a, b) => +a + +b.amount, 0);

			return(
				<Card key={data._id} className='mt-3'>
				<Card.Body>
					<Row>
						<Col className="col-6">
							<h5>{data.description}</h5>
							<h6>
								<span className="text-success">Income</span>
							</h6>
							<p>{data.createdOn}</p>
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
			
			const totalExpense = ListOfCurrentTransaction.reduce((a, b) => +a + +b.amount, 0);
			
			return(
				<Card key={data._id} className='mt-3'>
					<Card.Body>
						<Row>
							<Col className="col-6">
								<h5>{data.description}</h5>
								<h6>
									<span className="text-danger">Expense</span>
								</h6>
								<p>{data.createdOn}</p>
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

	return (
		<React.Fragment>
			{aTransaction}
		</React.Fragment>
	);
}