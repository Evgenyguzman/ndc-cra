import { connect } from 'react-redux'
import C from '../store/constants'

import { Device } from "../components/system/Device"
import { System } from '../components/system/System';
import { DeviceList } from '../components/system/DeviceList';
import { Sidebar } from '../components/system/Sidebar';
import WsCloudService from '../services/WsCloudService';
import { AddDevicePopup } from '../components/system/AddDevicePopup';
import { AddItemPopup } from '../components/system/AddItemPopup';
import { Item } from '../components/system/Item';
import { Items } from '../components/device/Items';

export const SystemContainer = connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    async onInit(){
      // dispatch({
        // type: C.
      // })
    }
  })
)(System)

export const DeviceContainer = connect( 
  state => ({
    system: state.system,
    user: state.user
  }),
  dispatch => ({
    async onRemove(id) {
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.removeDevice(id)
      console.log(res)
      if(!res.error){
        dispatch({type: C.REMOVE_DEVICE, data: id})
      }
    },
    async onChange(device) {
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.changeDevice(device)
      console.log(res)
      if(!res.error){
        // dispatch({type: C.UPDATE_DEVICE, data: res.device})
      }
    }
  })
)(Device)

export const ItemContainer = connect( 
  state => ({
    system: state.system,
    user: state.user
  }),
  dispatch => ({
    async onRemove(id) {
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.removeItem(id)
      console.log(res)
      if(!res.error){
        dispatch({type: C.REMOVE_DEVICE, data: id})
      }
    },
    async onChange(device) {
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.changeItem(device)
      console.log(res)
      if(!res.error){
        // dispatch({type: C.UPDATE_DEVICE, data: res.device})
      }
    }
  })
)(Item)

export const ItemsContainer = connect( 
  state => ({
    system: state.system,
    user: state.user
  }),
  dispatch => ({
    async onRemove(id, deviceId) {
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.removeItem(id)
      console.log(res)
      if(!res.error){
        dispatch({type: C.REMOVE_ITEM, data: id, deviceId})
      }
    },
    async onChange(item) {
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.changeItem(item)
      console.log(res)
      if(!res.error){
        dispatch({type: C.UPDATE_ITEM, data: res.item})
      }
    }
  })
)(Items)

export const DeviceListContainer = connect( 
  state => ({
    devices: Array.from(state.system.devices.values())
  }),
  null
)(DeviceList)

export const SidebarContainer = connect( 
  state => ({
    devices: Array.from(state.system.devices.values()),
  }),
  null
)(Sidebar)

export const addDevicePopupContainer = connect(
  state => ({
    settings: state.system.deviceSettings
  }),
  dispatch => ({
    async onAdd(device) {
      // console.log(device)
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.addDevice(device)
      console.log(res)
      if(!res.error){
        // dispatch({ type: C.ADD_DEVICE, data: res.device })
        return true
      }else{
        return false
      }
    }
  })
)(AddDevicePopup)

export const addItemPopupContainer = connect(
  state => ({
    settings: state.system.itemSettings,
    devices: state.system.devices,
  }),
  dispatch => ({
    async onAdd(item) {
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.addItem(item)
      console.log(res.item)
      if(!res.error){
        // dispatch({ type: C.ADD_ITEM, data: res.item, deviceId: item.deviceId })
        return true
      }else{
        return false
      }
    }
  })
)(AddItemPopup)
