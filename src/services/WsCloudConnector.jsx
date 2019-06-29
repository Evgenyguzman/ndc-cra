import React from "react";
import C from '../store/constants'
// import OwenCloudService from "./NewDayCloudService";
import WsCloudService from "./WsCloudService";

export class WsCloudConnector extends React.Component{

  constructor(props){
    super(props)
  }

  async componentWillMount(){
    const wsCloudService = WsCloudService.getInstance()
    await wsCloudService.connect('ws://192.168.0.3:81')

    const { dispatch } = this.props.store
    dispatch({type: C.SYSTEM_CONNECTED})

    wsCloudService.onDeviceChanged = (device) => {
      console.log(device)
      dispatch({type: C.UPDATE_DEVICE, data: device})
    }
    wsCloudService.onItemChanged = (item) => {
      console.log(item)
      dispatch({type: C.UPDATE_ITEM, data: item})
    }
    wsCloudService.onDisconnect = async () => {
      console.log('disconnected')
      dispatch({type: C.SYSTEM_DISCONNECTED})
      await wsCloudService.connect('ws://192.168.0.3:81')
      dispatch({type: C.SYSTEM_CONNECTED})
    }
    
    const devices = await wsCloudService.getDevices()
    dispatch({type: C.UPDATE_DEVICES, data: devices})
    const items = await wsCloudService.getItems()
    dispatch({type: C.UPDATE_ITEMS, data: items})
    const deviceSettings = await wsCloudService.getDeviceSettings()
    dispatch({type: C.UPDATE_DEVICE_SETTINGS, data: deviceSettings})
    const itemSettings = await wsCloudService.getItemSettings()
    dispatch({type: C.UPDATE_ITEM_SETTINGS, data: itemSettings})
    
    console.log(devices, items, deviceSettings, itemSettings)
  
  }

  render(){
    return null
  }
}