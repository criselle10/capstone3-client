import React, {useState, useEffect, useContext} from 'react';
import Router from 'next/router';
import BarChart from './BarChart.js';
import moment from 'moment';


export default function Income(){
	const [allRecords, setAllRecords] = useState([]);
	const [description, setDescription] = useState([]);
	const [type, setType] = useState([]);
	const [date, setDate] = useState([]);
	const [amount, setAmount] = useState([]);

	useEffect(()=> {
		fetch('http://localhost:4000/api/records/', {
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
				if(record.type === 'Income'){
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
			<BarChart rawData={allRecords} typeData='Income' colorData='#72a5b8' hoverBackgroundColorData='pink'/>
		</React.Fragment>
    )
}