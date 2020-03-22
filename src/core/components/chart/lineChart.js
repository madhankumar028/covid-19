import React from 'react';
import { Chart } from "react-google-charts";

const LineChart = ({ confirmed, death, recovered }) => {
	return(
		<Chart
			width={'300px'}
			height={'300px'}
			chartType="LineChart"
			loader={<div>Loading Chart</div>}
			data={[
				['x', 'dogs', 'cats'],
				[0, 0, 0],
				[1, 10, 5],
				[2, 23, 15],
				[3, 17, 9],
				[4, 18, 10],
				[5, 9, 5],
				[6, 11, 3],
				[7, 27, 19],
			]}
			options={{
				hAxis: {
					title: 'Days',
				},
				vAxis: {
					title: 'Count',
				},
				series: {
					1: { curveType: 'function' },
				},
				animation: {
					startup: true,
					easing: 'linear',
					duration: 1500,
				},
				legend: {
					textStyle: {
						color: "#fff",
						fontSize: 14
					}
				},
				backgroundColor: '#1e2730',
			}}
			rootProps={{ 'data-testid': '2' }}
		/>
	);
}

export default LineChart;
