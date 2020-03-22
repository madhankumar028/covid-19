import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'

import PieChart from './core/components/chart/pieChart';
import EventHandler from './event';

import './core/styles/app.scss';
import Navbar from './core/components/navbar/navbar';
import Summary from './core/components/summary/summary'
import LineChart from './core/components/chart/lineChart';

function App() {
  const [confirmedCasesList, setConfirmedCasesList] = useState([]);
  const [deathCasesList, setDeathCasesList] = useState([]);
  const [recoveredCasesList, setRecoveredCasesList] = useState([]);
  const [lastUpdatedDate, setLastUpdatedDate] = useState(null);
  const [summaryList, setSummaryList] = useState([]);

  const statusMapping = {
    confirmed: setConfirmedCasesList,
    deaths: setDeathCasesList,
    recovered: setRecoveredCasesList,
  };

  const setLastUpdatedDateToState = (date) => {
    setLastUpdatedDate((prevState) => {
      let lastUpdatedDateRef = date;
      prevState = dayjs(lastUpdatedDateRef).format('DD/MM/YYYY');
      return prevState;
    });
  };

  const setStateByStatus = (data, status) => {
    const getStateByStatus = statusMapping[status];
    getStateByStatus(() => {
      let formattedResponse = data.map(day => {
        return [dayjs(day.Date).format('DD/MM/YYYY'), day.Cases];
      });
      return formattedResponse;
    });
  };

  useEffect(() => {
    EventHandler({eventName: 'summary'})
      .then(summaryListResponse => {
        setSummaryList(JSON.parse(summaryListResponse).Countries);
      });
    Object.keys(statusMapping).map((status) => {
      EventHandler({eventName: 'byCountry', options: { country: 'india', status }})
        .then(coronaConfirmedCasesInIndia => {
          setLastUpdatedDateToState(coronaConfirmedCasesInIndia[coronaConfirmedCasesInIndia.length - 1].Date);
          setStateByStatus(coronaConfirmedCasesInIndia, status);
        });
    });
  }, []);

  const getSummaryByCountry = (country) => {
    return summaryList.filter(summary => summary.Country === country);
  }

  return (
    <div className="app">
      <Navbar title="Covid-19 update for India"/>
      <div className="summary__list u-flex u-justify-content-space-between u-align-items-center">
        { summaryList.length > 0 && <Summary dataList={getSummaryByCountry('India')[0]}/>}
      </div>
      <div className="app-header">
        {
          confirmedCasesList.length > 0 &&
            <div className="card u-flex__column u-height__half u-o-scrollX">
              <div className="u-inline-flex u-justify-content-space-between">
                <span className="u-text-left u-text-white">
                  Total Cases: <span className="u-text-white">{confirmedCasesList[confirmedCasesList.length - 1][1]}</span>
                </span>
                <span className="u-text-right u-text-white">
                  Last Update: <span className="u-text-white">{lastUpdatedDate}</span>
                </span>
              </div>
              <PieChart dataList={confirmedCasesList} />
            </div>
        }
        {/* {
          deathCasesList.length > 0 &&
            confirmedCasesList.length > 0 &&
              recoveredCasesList.length > 0 &&
                <div className="card u-height__half u-o-scrollX">
                  <LineChart
                    confirmed={confirmedCasesList}
                    death={deathCasesList}
                    recovered={recoveredCasesList}
                  />
                </div>
        } */}
      </div>
    </div>
  );
}

export default App;
