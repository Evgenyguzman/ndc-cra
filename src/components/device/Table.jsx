import React from "react";
import { SimpleTable } from "../ui/Tables/Tables";

export class Table extends React.Component{
  render(){

    console.log(this.props.parameters)

    const columns = [{
      Header: 'ID',
      accessor: 'id'
    },{
      Header: 'Параметр',
      accessor: 'name'
    }, {
      Header: 'Значение',
      accessor: 'interpreted-data',
      Cell: props => <span className='number'>{props.value}</span>
    }, {
      Header: 'Данные',
      accessor: 'raw-data'
    }, {
      Header: 'Тип',
      accessor: 'data-type'
    }, {
      Header: 'Время хранения',
      accessor: 'storage-range-time'
    }, {
      Header: 'Код ошибки',
      accessor: 'error'
    }, {
      Header: 'Больше',
      Cell: props => {
        console.log(props)
        return React.createElement(this.props.popup, {settings: props.original.settings})
        // return <span className='number'>{props.value}</span>
      }
    }]

    return <div className="relative-table"><SimpleTable parameters={this.props.parameters} columns={columns} /></div>
  }
}