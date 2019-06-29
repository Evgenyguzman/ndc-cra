import C from './constants'
import { combineReducers } from 'redux'

const devices = (state = new Map(), action) => {
  let new_state = new Map(state)
  switch (action.type) {
    case C.UPDATE_DEVICES:
      let {devices} = action.data
      devices = devices.map(device=>{
        return [device.id, device]
      })
      const map = new Map(devices)
      return map
    case C.UPDATE_DEVICE:
      const device = action.data
      new_state.set(device.id, device)
      return new_state
    case C.REMOVE_DEVICE:
      const id = action.data
      if(new_state.has(id)) new_state.delete(id)
      return new_state
    default:
      return state
  }
}

const items = (state = new Map(), action) => {
  let new_state = new Map(state)
  switch (action.type) {
    case C.UPDATE_ITEMS:
      let {items} = action.data
      items = items.map(item => {
        return [item.id, item]
      })
      const map = new Map(items)
      return map
    case C.UPDATE_ITEM:
      const item = action.data
      new_state.set(item.id, item)
      return new_state
    case C.REMOVE_ITEM:
      const id = action.data
      if(new_state.has(id)) new_state.delete(id)
      return new_state
    default:
      return state
  }
}

const deviceSettings = (state = [], action) => {
  switch(action.type){
    case C.UPDATE_DEVICE_SETTINGS:
      return action.data['device-settings']
    default:
      return state
  }
}
const itemSettings = (state = [], action) => {
  switch(action.type){
    case C.UPDATE_ITEM_SETTINGS:
      return action.data['item-settings']
    default:
      return state
  }
}

const systemInfo = (state = {}, action) => {
  let new_state = JSON.parse(JSON.stringify(state))
  switch(action.type){
    case C.SYSTEM_CONNECTED:
      new_state.isConnected = true
      return new_state
    case C.SYSTEM_DISCONNECTED:
      new_state.isConnected = false
      return new_state
    default:
      return state
  }
}

const user = (state = {}, action) => {
  let new_state = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case C.SIGN_IN:
      {
        const { login, password, token, name, surname } = action
        return { login, password, token, name, surname }
      }
    case C.QUIT:
      return {}
    case C.ADD_TOKEN:
      new_state.token = action.token
      return new_state
    case C.REMOVE_TOKEN:
      delete new_state.token
      return new_state
    default:
      return state
  }
}


const system = combineReducers({
  devices,
  items, 
  deviceSettings,
  itemSettings,
  systemInfo
})

const mainReducer = combineReducers({
  system,
  user
})
export default mainReducer

