/* eslint-disable array-callback-return */
import React, { Fragment } from "react";
import "./summary.scss";

const Summary = ({ dataList }) => {
	const filteredSummaryItems = ['Country', 'New Recovered', 'Slug'];
	return (
		<Fragment>
			{
				Object.keys(dataList).map((summaryItem, index) => {
					if (!filteredSummaryItems.includes(summaryItem)) {
						return (
							<div className="card u-flex__column summary__item" key={index}>
								<div className="summary__title u-text-white">{summaryItem}</div>
								<div className="summary__count u-text-white">{dataList[summaryItem]}</div>
							</div>
						)
					}
				})
			}
		</Fragment>
	)
};

export default Summary;
