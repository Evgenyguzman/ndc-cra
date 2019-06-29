import React from "react";
import {Line} from 'react-chartjs-2';

const range = ((min, max , step = 1) => {
  const arr = [];
  const totalSteps = Math.floor((max - min)/step);
  for (let ii = 0; ii <= totalSteps; ii++ ) { arr.push(ii * step + min) }
  return arr;
} )

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

// arr.map((key)=>key+1)

export class LineChart extends React.Component{
  constructor(props){
    super(props)
  }
  render(){

    // const data = this.props.data
    const data = {
      labels: range(1,this.props.data.length),
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.data.map(item=>item||getRandom(-50, 50))
        }
      ]
    }

    return (
      <div>
        <Line data={data} width={600} />
      </div>
    )
  }
}