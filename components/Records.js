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

	console.log(allTransaction)
	console.log(savings)

	const aTransaction = allTransaction.map(data => {
	console.log(data.type)
	if (data.type === 'Income'){
		//setTotalSavings((totalSavings + data.amount))
		return(
			<Card key={data._id}>
			<Card.Body>
				<Row>
					<Col className="col-6">
						<h5>{data.description}</h5>
						<h6>
							<span className="text-success">Income</span>
						</h6>
						<p>{data.createdON}</p>
					</Col>
					<Col className="col-6 text-right">
						<h6 className="text-success">+ {data.amount}</h6>
						<span className="text-success">{savings}</span>
					</Col>
				</Row>
			</Card.Body>
			</Card>
		)
	}else{
		return(
			<Card key={data._id}>
				<Card.Body>
					<Row>
						<Col className="col-6">
							<h5>{data.description}</h5>
							<h6>
								<span className="text-danger">Expense</span>
							</h6>
							<p>{data.createdON}</p>
						</Col>
						<Col className="col-6 text-right">
							<h6 className="text-danger">+ {data.amount}</h6>
							<span className="text-danger">{savings}</span>
						</Col>
					</Row>
				</Card.Body>
			</Card>
	)}	
	})

	return (
		<React.Fragment>
			<h1>Records</h1>
			<InputGroup>
				<InputGroup.Prepend>
					<Button variant="success" type="submit" id="submitBtn">
						Add
					</Button>
				</InputGroup.Prepend>
				<FormControl
					placeholder="Search Record"
				/>
				<Form.Control
					as="select"
					required
				>
					<option>All</option>
					<option>Income</option>
					<option>Expense</option>
				</Form.Control>
			</InputGroup>
			
			{aTransaction}
			
		</React.Fragment>
	);
}