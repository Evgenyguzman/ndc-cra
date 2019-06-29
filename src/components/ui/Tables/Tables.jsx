import React from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import './Tables.sass';

export class SimpleTable extends React.Component{
  render(){

    const data = this.props.parameters || []
   
    const columns = this.props.columns

    return <ReactTable
      data={data}
      columns={columns}
      minRows={1}
      showPagination={false}
    />
  }
}