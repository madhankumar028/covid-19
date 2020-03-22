import React from 'react';
import { Chart } from "react-google-charts";

const GeoChart = () => {
	const options = {
		legend: {
			position: "bottom",
			alignment: "center",
			textStyle: {
				color: "#fff",
				fontSize: 14
			}
		},
		colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
		animation: {
			startup: true,
			easing: 'linear',
			duration: 1500,
		},
		tooltip: {
			showColorCode: true
		},
		backgroundColor: '#1e2730',
		fontName: "Roboto",
		region: '034',
	};

	return(
		<Chart
			width={'300px'}
			height={'300px'}
			chartType="GeoChart"
			options={options}
			data={[
				['Country', 'Popularity'],
				['IN', 700],
				['IN-TN', 100],
			]}
			// Note: you will need to get a mapsApiKey for your project.
			// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
			mapsApiKey="AIzaSyApGSRs5COo6qvzuX1MO8n5N6VlbUzfiCo"
			rootProps={{ 'data-testid': '1' }}
		/>
	)
}

export default GeoChart;
