import React, {useState, useEffect} from 'react'
import Router from 'next/router';
import {Form, Button, Row, Col} from 'react-bootstrap'
import Swal from 'sweetalert2';
import styles from './register.module.css';

export default function index(){

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [isActive, setIsActive] = useState(false);

	function registerUser(e){
		
		e.preventDefault();


		fetch('https://guarded-escarpment-99106.herokuapp.com/api/users/emailExist', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			}),
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				return Swal.fire({
					icon: "error",
					title: "Email Already Exist.",
					text: "Registration Failed."
				})  
			}else{
				fetch('https://guarded-escarpment-99106.herokuapp.com/api/users/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password1,
						confirmPassword: password2
					})
				})
				.then(res => res.json())
				.then(data => {

					Swal.fire({
					icon: "success",
					title: "You have been registered",
					text: "Registration Success."
				})  
					setFirstName('');
					setLastName('');
					setEmail('');
					setMobileNo('');
					setPassword1('');
					setPassword2('');
					Router.push('/login')
				})
			}
		})
	}

	useEffect(() => {
		if((firstName !== '' && lastName !== '' && mobileNo !== '' && email !== '' && password1 !== '' && password2 !== '') && (password1 === password2) && (mobileNo.length === 11)){
			setIsActive(true)
		}else{
			setIsActive(false)
		}
	}, [firstName, lastName, mobileNo, email, password1, password2]);

	return(
		<>
			<Form onSubmit={(e) => registerUser(e)} className={styles.regform}>
				<Form.Group controlId = "firstName">
					<Form.Label className={styles.label}>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						className={styles.inputtext}
					/>
				</Form.Group>
				<Form.Group controlId = "lastName">
					<Form.Label className={styles.label}>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						className={styles.inputtext}
					/>
				</Form.Group>
				<Form.Group controlId = "mobileNo">
					<Form.Label className={styles.label}>Mobile No</Form.Label>
					<Form.Control
						type="number"
						placeholder="Mobile No."
						value={mobileNo}
						onChange={(e) => setMobileNo(e.target.value)}
						required
						className={styles.inputtext}
					/>
				</Form.Group>
				<Form.Group controlId = "userEmail">
					<Form.Label className={styles.label}>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className={styles.inputtext}
					/>
				</Form.Group>
				
				<Form.Row>
					<Form.Group as={Col} controlId = "password1">
						<Form.Label className={styles.label}>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password1}
							onChange={(e) => setPassword1(e.target.value)}
							required
							className={styles.inputtext}
						/>
					</Form.Group>
					<Form.Group as={Col} controlId = "password2">
						<Form.Label className={styles.label}>Verify Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Verify Password"
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
							required
							className={styles.inputtext}
						/>
					</Form.Group>
				</Form.Row>
				{isActive ? 
				<Button variant="warning"  type="submit" id="submitBtn" className={styles.regbutton}>
				Submit
				</Button>
				:
				<Button variant="warning" type="submit" id="submitBtn" disabled className={styles.regbutton}>
				Submit
				</Button>
				}
			</Form>
			<footer className={styles.footer} fluid>
				<p className={styles.mny}>mnyTracker</p> <p> &copy; All Rights Reserved</p>
			</footer>
		</>
	)	
}