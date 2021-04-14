import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import moment from 'moment';


export default function BarChart({rawData}){

	const [months, setMonths] = useState([
		'January', 
		'February', 
		'March', 
		'April', 
		'May', 
		'June', 
		'July', 
		'August', 
		'September', 
		'October', 
		'November', 
		'December'
	]);
	const [expensePerMonth, setExpensePerMonth] = useState([]);

	useEffect(() => {
		setExpensePerMonth(months.map(month => {
			let total = 0;
			rawData.forEach(element => {
				if(element.type === 'Expense'){
					if(moment(element.dateOfTransaction).format('MMMM') === month){
					total += element.amount
				}
				}
			})
			return total
		}))
	}, [rawData])

	const data = {
		labels: months,
		datasets: [{
			label: 'Monthly Expense',
			backgroundColor: 'black',
			borderColor: 'white',
			borderWidth: 1,
			hoverBackgroundColor: 'lightBlue',
			hoverBorderColor: 'black',
			data: expensePerMonth
		}]
	}

	const options = {
		scales: {
			yAxes: [{
				ticks: {beginAtZero: true}
			}]
		}
	}

	return(
		<React.Fragment>
			<h1>Monthly Expense(Php)</h1>
			<Bar data={data} options={options}/>
		</React.Fragment>
	)
}
