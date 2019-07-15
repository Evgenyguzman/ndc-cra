import React from "react";
import { Field } from "./Field";
import { Button } from "../Buttons/Buttons";

// import './Inputs.sass';

export class Form extends React.Component{
  constructor(props){
    super(props)

    // console.log(props.values)
    this.state = {
      values: props.values || {},
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    // if(nextProps.values){
    //   this.setState({values: nextProps.values})
    // }
  }

  // реагировать на изменения values извне
  // autoconfirm when all fields have no errors

  onChange(value, name, isError){
    let {values, errors} = this.state
    values[name] = value
    errors[name] = isError
    // console.log(value, name)
    // console.log(values, errors)
    this.setState({values, errors})

    if(this.props.autoconfirm){
      const isError = Object.keys(errors).some((key)=>{
        return errors[key]
      })
      if(!isError){
        // console.log
        this.props.onConfirm({data: values})
      }
    }

  }

  render(){
    const {values, errors} = this.state
    const {fields, autoconfirm, forms} = this.props
    const isError = Object.keys(errors).some((key)=>{
      return errors[key]
    })
    console.log(values, errors, isError)
    return(
      <React.Fragment>
        {
          fields.map((field, i) =>
            <Field key={i} data={field} value={values[field.name]} error={errors[field.name]} onChange={(value, name, isError)=>this.onChange(value, name, isError)} />
          )
        }
        {
          forms && forms.map((form, i)=>
            <Form key={i} fields={form.fields} values={form.values} autoconfirm={form.autoconfirm || true} onConfirm={({data})=>this.onChange(data, form.name, false)} />
          )
        }
        {
          !autoconfirm
          ?
            isError
            ?
              <Button disabled={true}>Disabled button</Button>
            :
              <Button onClick={()=>{this.props.onConfirm({data: this.state.values})}}>Подтвердить</Button>
          :
            null
        }
      </React.Fragment>
    )
  }
}