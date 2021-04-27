import React, {useState, useEffect, useContext} from 'react';
import Router from 'next/router';
import BarChart from './BarChart.js';
import moment from 'moment';
import styles from './charts.module.css';

export default function Expense(){
	const [allRecords, setAllRecords] = useState([]);
	const [description, setDescription] = useState([]);
	const [type, setType] = useState([]);
	const [date, setDate] = useState([]);
	const [amount, setAmount] = useState([]);

	useEffect(()=> {
		fetch('https://guarded-escarpment-99106.herokuapp.com/api/records/', {
		    headers: {
		        'Authorization': `Bearer ${localStorage.getItem('token')}`
		    }
		})
		.then( res => res.json())
		.then(data => {
			setAllRecords(data)
			const recordDescription = data.map( record => {
				return record.description
			})
			setDescription(recordDescription)

			const recordType = data.map( record => {
				return record.type
			})
			setType(recordType)

			const recordDate = data.map( record => {
				return moment(record.dateOfTransaction).format('MMMM/DD/YYYY')
			})
			setDate(recordDate)

			const recordAmount = data.filter( record => {
				if(record.type === 'Expense'){
					return record
				}
			})
			const totalAmount = recordAmount.map(record => {
				return record.amount
			})
			setAmount(totalAmount)
		})
	}, [])

	return (
		<React.Fragment>
			<BarChart rawData={allRecords} typeData='Expense' colorData='#ba7b8e' hoverBackgroundColorData='lightblue'/>
		</React.Fragment>
    )
}
