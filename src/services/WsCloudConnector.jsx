import React from "react";
import C from '../store/constants'
// import OwenCloudService from "./NewDayCloudService";
import WsCloudService from "./WsCloudService";

export class WsCloudConnector extends React.Component{

  constructor(props){
    super(props)
    this.connect = this.connect.bind(this)
    this.getData = this.getData.bind(this)
  }

  state = {
    isConnected: false
  }

  host = 'ws://192.168.0.5:8181'

  async componentWillMount(){
    this.wsCloudService = WsCloudService.getInstance()
    const { dispatch } = this.props.store
    this.wsCloudService.onDeviceChanged = (device) => {
      console.log(device)
      dispatch({type: C.UPDATE_DEVICE, data: device})
    }
    this.wsCloudService.onItemChanged = (item) => {
      console.log(item)
      dispatch({type: C.UPDATE_ITEM, data: item})

      // if value changed and now is in chart time range
      // add to chart values

    }
    this.wsCloudService.onDeviceAdded = (device) => {
      console.log(device)
      dispatch({type: C.ADD_DEVICE, data: device})
    }
    this.wsCloudService.onItemAdded = (item) => {
      console.log(item)
      dispatch({type: C.ADD_ITEM, data: item})
    }
    this.wsCloudService.onDeviceRemoved = ({deviceId}) => {
      console.log(deviceId)
      dispatch({type: C.REMOVE_DEVICE, data: deviceId})
    }
    this.wsCloudService.onItemRemoved = ({itemId}) => {
      const deviceId = this.props.store.getState().system.items.get(itemId)['device-id']
      console.log(itemId, deviceId)
      dispatch({type: C.REMOVE_ITEM, data: itemId, deviceId})
    }
    this.wsCloudService.onDisconnect = async () => {
      console.log('disconnected')
      this.setState({
        isConnected: false
      })
      dispatch({type: C.SYSTEM_DISCONNECTED})
      this.connect()
    }

    this.connect()
  
  }

  async connect(){
    const { dispatch } = this.props.store
    dispatch({type: C.SYSTEM_DISCONNECTED})
    const res = await this.wsCloudService.connect(this.host)
    console.log('Result of connecting: ' + res)

    if(!res) {
      setTimeout(()=>{
        this.connect()
      }, 15000)
      return
    }

    setTimeout(()=>{
      this.setState({
        isConnected: true
      })
    }, 500)

    await this.getData()

    return true
  }

  async getData(){
    const { dispatch } = this.props.store
    dispatch({type: C.SYSTEM_CONNECTED})
    const devices = await this.wsCloudService.getDevices()
    dispatch({type: C.UPDATE_DEVICES, data: devices})
    const items = await this.wsCloudService.getItems()
    dispatch({type: C.UPDATE_ITEMS, data: items})
    const deviceSettings = await this.wsCloudService.getDeviceSettings()
    dispatch({type: C.UPDATE_DEVICE_SETTINGS, data: deviceSettings})
    const itemSettings = await this.wsCloudService.getItemSettings()
    dispatch({type: C.UPDATE_ITEM_SETTINGS, data: itemSettings})
    const dictionary = await this.wsCloudService.getDictionary()
    dispatch({type: C.UPDATE_DICTIONARY, data: dictionary})
    console.log(devices, items, deviceSettings, itemSettings, dictionary)
  } 

  render(){
    return null
  }
}