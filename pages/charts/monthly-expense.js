import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import {Form, Button} from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import BarChart from '../component/BarChart';

export default function MonthlyExpense(){

    return (
        // Mini Activity
        // Create a react fragment containing the following
        /*
            1. Banner with the following information
                a. country name
                b. deaths
                c. criticals
                d. recoveries
            2. DoughnutChart with the following information:
                a.criticals
                b. deaths
                c. recoveries
        */
       <React.Fragment>
           <h3>Monthly Expense</h3>
           <DoughnutChart 
                criticals={toNum(country.serious_critical)}
                deaths={toNum(country.deaths)}
                recoveries={toNum(country.total_recovered)}
           />
       </React.Fragment>
    )
}
/*
    --create the getStaticPaths function for next to know what are the possible paths/values
    your id can have.
    --getStaticPaths is a unique/predefined function in nextJS. This is used in conjuntion
    with our setStaticProps to create dynamic routing.
    --In layman's terms, this says what routes are available ex. /covid/countries/USA,
    /covid/countries/Philippines
*/

export async function getStaticPaths(){
    // what we want to do is for our country name be the id that we provide for the path
    // get the data from rapidapi
    const res = await fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "6085b628a5msh12b4765569d1427p1188bbjsnd3c4dc348539"
        }
    })

    const data = await res.json();
    
    // map the data to individual countries
    const paths = data.countries_stat.map(country => {
        return {
            params: {
                id: country.country_name
            }
        }
    })
    console.log(paths)

    // return teh paramsfor them to be tha ids.
    return {paths, fallback: false}
    // fallback:false means that when a path is invalid, it would default to next's 404 page
    // fallback:true means that when a path is invalid, you provide your custom 404 page
}

// get data for the specific country using getStaticProps
// getStaticProps will now use the params from the getStaticPaths to filter the data that we fetch.
export async function getStaticProps({params}){
    // get ALL the data from rapidapi
    const res = await fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "6085b628a5msh12b4765569d1427p1188bbjsnd3c4dc348539"
        }
    })

    const data = await res.json()

    // filter the data using find
    const country = data.countries_stat.find(country => country.country_name === params.id)
    // the params.id is the one specified in our path
    // ex. /covid/countries/Panama, Panama would correspond to params.id

    // return the data for the specified country
    return {
        props: {
            country
        }
    }
}