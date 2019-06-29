import { connect } from 'react-redux'
import C from '../store/constants'

import { Device } from "../components/system/Device"
import { System } from '../components/system/System';
import { DeviceList } from '../components/system/DeviceList';
import { Sidebar } from '../components/system/Sidebar';
import WsCloudService from '../services/WsCloudService';
import { AddDevicePopup } from '../components/system/AddDevicePopup';

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
    async onRemove(id, token) {
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.removeDevice(id)
      if(res.success){
        dispatch({type: C.REMOVE_DEVICE, data: id})
      }
    }
  })
)(Device)

// export const ItemContainer = connect( 
//   state => ({
//     system: state.system,
//     user: state.user
//   }),
//   dispatch => ({
//     async onRemove(id, token) {
//       const wsCloudService = WsCloudService.getInstance()
//       const res = await wsCloudService.removeItem(id)
//       console.log(res)
//       // if success
//       // dispatch({type: C.REMOVE_ITEM, data: id})
//     }
//   })
// )(Item)

export const DeviceListContainer = connect( 
  state => ({
    devices: Array.from(state.system.devices.values())
  }),
  dispatch =>({})
)(DeviceList)

export const SidebarContainer = connect( 
  state => ({
    devices: Array.from(state.system.devices.values()),
  }),
  dispatch => ({})
)(Sidebar)

export const addDevicePopupContainer = connect(
  state => ({
    deviceSettings: state.system.deviceSettings
  }),
  dispatch => ({
    async onAddDevice(device) {
      // console.log(device)
      const wsCloudService = WsCloudService.getInstance()
      const res = await wsCloudService.addDevice(device)
      console.log(res)
      dispatch({ type: C.UPDATE_DEVICE, data: res.device })
    }
  })
)(AddDevicePopup)

// export const addItemPopupContainer = connect(
//   state => ({
//     settings: state.system.itemSettings
//   }),
//   dispatch => ({
//     async onAddItem(item) {
//       // console.log(device)
//       const wsCloudService = WsCloudService.getInstance()
//       const res = await wsCloudService.addItem(item)
//       console.log(res)
//       dispatch({ type: C.UPDATE_ITEM, data: res.item })
//     }
//   })
// )(AddItemPopup)