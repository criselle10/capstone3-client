import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import moment from 'moment';


export default function BarChart({rawData, typeData, colorData, hoverBackgroundColorData}){

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
	const [budgetPerMonth, setBudgetPerMonth] = useState([]);

	useEffect(() => {
		setBudgetPerMonth(months.map(month => {
			let total = 0;
			rawData.forEach(element => {
				if(element.type === typeData){
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
			label: `Monthly ${typeData}`,
			backgroundColor: `${colorData}`,
			borderColor: 'white',
			borderWidth: 1,
			// hoverBackgroundColor: `${hoverBackgroundColorData}`,
			hoverBorderColor: '#454747',
			data: budgetPerMonth
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
			<h1>Monthly {typeData}(Php)</h1>
			<Bar data={data} options={options}/>
		</React.Fragment>
	)
}
