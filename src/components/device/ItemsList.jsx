import React from "react";
import { SimpleTable } from "../ui/Tables/Tables";

export class ItemsList extends React.Component{
  render(){

    // console.log(this.props.parameters)

    const columns = [{
      Header: 'ID',
      accessor: 'id'
    },{
      Header: 'Параметр',
      accessor: 'name'
    }, {
      Header: 'Значение',
      accessor: 'value',
      Cell: props => <span className='number'>{props.value}</span>
    }, {
      Header: 'Данные',
      accessor: 'data'
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
        // console.log(props)
        return React.createElement(this.props.link, {id: props.original.id})
        // return <span className='number'>{props.value}</span>
      }
    }, {
      Header: 'Удалить',
      Cell: props => {
        return React.createElement(this.props.deleteBtn, {itemId: props.original.id, deviceId: this.props.deviceId, onRemove: this.props.onRemove})
      }
    }]

    return(
      <React.Fragment>
        <h2>Параметры</h2>
        <div className="relative-table"><SimpleTable parameters={this.props.parameters} columns={columns} /></div>
      </React.Fragment>
    )
  }
}