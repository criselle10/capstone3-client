import React, {useState, useEffect, useContext} from 'react';
import Router from 'next/router';
import BarChart from './BarChart.js';
import moment from 'moment';
import styles from './charts.module.css';

export default function Income(){
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
			<div className={styles.incomeBody}>
				<div className='col-lg-12 col-md-10  my-5'>
					<div className="card">
						<div className="card-body" id={styles.cardbody}>
							<BarChart rawData={allRecords} typeData='Income' colorData='#e7b7c8' hoverBackgroundColorData='#cdb3d4'/>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
    )
}
