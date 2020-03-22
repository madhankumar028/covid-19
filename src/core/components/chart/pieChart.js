import React, { useState, useEffect, Fragment } from 'react';
import { Chart } from "react-google-charts";

const PieChart = ({ dataList }) => {

	const pieOptions = {
		title: "",
		pieHole: 0.4,
		legend: {
			position: "bottom",
			alignment: "center",
			textStyle: {
				color: "#fff",
				fontSize: 14
			}
		},
		animation: {
			startup: true,
			easing: 'linear',
			duration: 1500,
		},
		tooltip: {
			showColorCode: true
		},
		backgroundColor: '#1e2730',
		chartArea: {
			left: 0,
			top: 0,
			width: "100%",
			height: "80%"
		},
		fontName: "Roboto",
		is3D: true,
	};

	const [coronaData, setCoronaData] = useState(dataList);

	useEffect(() => {
		setCoronaData((prevState) => {
			prevState.unshift(['Count', 'Day']);
			return prevState;
		})
	}, [dataList]);

	return (
		<Fragment>
			<Chart
				width={'300px'}
				height={'300px'}
				chartType="PieChart"
				options={pieOptions}
				loader={<div>Loading Chart ...</div>}
				data={coronaData}
			/>
		</Fragment>
	)
};

export default PieChart;
