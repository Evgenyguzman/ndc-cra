import React from "react";
import { LineChart } from "../ui/Charts/Charts";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SimpleCard } from "../ui/Cards/Cards";

export class Chart extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      values: [],
      labels: [],
    }
    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnd = this.handleChangeEnd.bind(this)
    this.getData = this.getData.bind(this)
    this.setData = this.setData.bind(this)
  }

  componentWillMount(){
    const startDate = new Date()
    const endDate = new Date()
    startDate.setHours(0,0,0,0)
    endDate.setHours(23,59,59,999)
    this.setState({
      startDate,
      endDate
    }, this.getData)
    this.interval = setInterval(this.getData, 30000)
  }
  
  componentWillUnmount(){
    clearInterval(this.interval)
  }

  handleChangeStart(date){
    date.setHours(0,0,0,0)
    this.setState({
      startDate: date
    }, this.getData)
  }
  handleChangeEnd(date){
    date.setHours(23,59,59,999)
    this.setState({
      endDate: date
    }, this.getData)
  }

  async getData(){
    const { startDate, endDate } = this.state
    const from = Date.parse(startDate)
    const to = Date.parse(endDate)
    console.log('Get data from ' + startDate + ' to ' + endDate)

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
      let hour = date.getHours()
      if (hour < 10) hour = '0' + hour
      let minute = date.getMinutes()
      if (minute < 10) minute = '0' + minute
      let second = date.getSeconds()
      if (second < 10) second = '0' + second
      return day + '.' + month + '.' + year + ' ' + hour + ':' + minute + ':' + second
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