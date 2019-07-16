import React from "react";
import { LineChart } from "../ui/Charts/Charts";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SimpleCard } from "../ui/Cards/Cards";

export class Chart extends React.Component{

  constructor(props){
    super(props)

    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(endDate.getDate()-1)

    this.state = {
      values: [],
      labels: [],
      startDate,
      endDate
    }
    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnd = this.handleChangeEnd.bind(this)
    this.getData = this.getData.bind(this)
    this.setData = this.setData.bind(this)
  }

  handleChangeStart(date){
    this.setState({
      startDate: date
    }, this.getData)
  }
  handleChangeEnd(date){
    this.setState({
      endDate: date
    }, this.getData)
  }

  async getData(){
    const { startDate, endDate } = this.state
    console.log('Get data from ' + startDate + ' to ' + endDate)
    const from = Date.parse(startDate)
    const to = Date.parse(endDate)

    let data = [{
      value: 56,
      data: 'ff',
      error: 0,
      time: new Date().toISOString()
    }]

    if(this.props.itemId){
      data = await this.props.getItemDataStorage({'id': this.props.itemId, from, to})
      // console.log(data)
      if(data.error) {alert('error'); return} else {data=data['item-data-storage']}
    }
    this.setData(data)

  }

  setData(data){
    const sortData = data.sort(function (a, b) {
      return Date.parse(a.time) - Date.parse(b.time)
    })
    // console.log(sortData)

    const labels = sortData.map(row => {
      const date = new Date(row.time)
      let day = date.getDate()
      if (day < 10) day = '0' + day
      let month = date.getMonth()+1
      if (month < 10) month = '0' + month
      const year = ('' + date.getFullYear()).slice(-2)
      return day + '.' + month + '.' + year
    })
    // console.log(labels)

    const values = sortData.map(row => {
      return row.value
    })
    // console.log(values)

    this.setState({
      values,
      labels
    })
  }

  componentWillMount(){
    this.getData()
    // setInterval(this.getData, 30000)
  }

  render(){
    // console.log(this.state)
    return(
      <SimpleCard>
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />
        <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          minDate={this.state.startDate}
        />

        <LineChart labels={this.state.labels} data={this.state.values} />

      </SimpleCard>
    )
  }
}