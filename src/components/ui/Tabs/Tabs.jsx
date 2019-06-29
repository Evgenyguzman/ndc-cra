import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import './Tabs.sass';
import { LineChart } from "../Charts";

export class SimpleTabs extends React.Component{
  render(){
    // console.log
    return (
      <Tabs>
        <TabList>
          <Tab>Смена 1</Tab>
          <Tab>Смена 2</Tab>
          <Tab>Смена 3</Tab>
          <Tab>Смена 4</Tab>
          <Tab>Месяц</Tab>
          <Tab>Год</Tab>
        </TabList>

        {
          this.props.charts.map((chart, i)=>
            <TabPanel key={i}>
              <LineChart data={chart} />
            </TabPanel>
          )
        }
      </Tabs>
    )
  }
}