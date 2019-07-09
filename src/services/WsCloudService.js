export default class WsCloudService {

	static instance = null

	resolve = undefined
	requests = new Map()

	static getInstance(){
		if(WsCloudService.instance === null){
			WsCloudService.instance = new WsCloudService()
		}
		return WsCloudService.instance
	}

	async connect(address) {
		this.log('connecting...')
		this.state = 'connecting'
		try{
			this.socket = new WebSocket(address)
		}catch(e){
			return false
		}
	  this.socket.addEventListener('message', (event) => {
	    // this.log('received: ' + event.data)
	    let data = JSON.parse(event.data)
	    this.receive(data)
      if (this.state === 'getToken' && data.type === 'result') {
				this.state = data.code === 0 ? 'login-required' : 'login-required'
				this.token = data.token
				this.resolve(data.data)
      }
			if (this.state === 'login' && data.type === 'result') {
				this.state = data.code === 0 ? 'authorized' : 'login-required'
				this.token = data.token
				this.resolve(data.code === 0)
			}
			if (this.state === 'register' && data.type === 'result') {
				this.state = data.code === 0 ? 'login-required' : 'login-required'
				this.token = data.token
				this.resolve(data.code === 0)
			}
	  })
		this.socket.addEventListener('open', (event) => {
			// this.state = 'login-required'
			this.state = 'authorized'
			this.resolve(true)
		})
		this.socket.addEventListener('error', (event) => {
			// console.log('ws error', event)
			if (this.state === 'connecting') this.resolve(false)
			if (this.state === 'authorized') {
				this.onDisconnect()
			}
			this.state = 'disconnected'
			this.resolve(false)
		})
		this.socket.addEventListener('close', (event) => {
			// console.log('ws close', event)
			if (this.state === 'connecting') this.resolve(false)
			if (this.state === 'authorized') {
				this.onDisconnect()
			}
			this.state = 'disconnected'
			this.resolve(false)
		})
	  return new Promise((resolve, reject) => { 
			this.resolve = resolve
			this.reject = reject
		})
  }

  async register(userId, password){
    this.log(this.state)
		if (this.state !== 'login-required') return false
		this.log(`register (${userId}, ${password})...`)
		this.state = 'register'
		let data = {'action': 'register', 'id': userId, 'password': password}
		this.socket.send(JSON.stringify(data))
		return new Promise((resolve, reject) => { 
			this.resolve = resolve
			this.reject = reject
		})
  }

  async getToken(userId, password){
    this.log(this.state)
		if (this.state !== 'login-required') return false
		this.log(`get token (${userId}, ${password})...`)
		this.state = 'getToken'
		let data = {'action': 'get-token', 'id': userId, 'password': password}
		this.socket.send(JSON.stringify(data))
		return new Promise((resolve, reject) => { 
			this.resolve = resolve
			this.reject = reject
		})
  }

	async login(token) {
    this.log(this.state)
		if (this.state !== 'login-required') return false
		this.log(`login (${token})...`)
		this.state = 'login'
		let data = {'action': 'login', 'token': token}
		this.socket.send(JSON.stringify(data))
		return new Promise((resolve, reject) => { 
			this.resolve = resolve
			this.reject = reject
		})
	}

	logout() {
		if (this.state !== 'authorized') return
		this.state = 'login-required'
		this.socket.send(JSON.stringify({'action': 'logout'}))
  }

	// ____________________ //

	receive(data) {
		// this.log(data)
		switch (data.type) {
			case 'reply': this.onReply(data); break
			case 'device': this.onDeviceChanged(data.device); break
			case 'item': this.onItemChanged(data.item); break
			case 'new-device': this.onDeviceAdded(data.device); break
			case 'new-item': this.onItemAdded(data.item); break
			case 'device-removed': this.onDeviceRemoved({deviceId: data['device-id']}); break
			case 'item-removed': this.onItemRemoved({ itemId: data['item-id'], deviceId: data['device-id']}); break
			default: break
		}
	}

	log(text) {
		console.log('Hydra: ', text)
	}

  onReply(data) {
		const requestId = data['request-id']
		// console.log(requestId, this.requests)
		const request = this.requests.get(requestId)
		if(request){
			request(data.data)
			this.requests.delete(requestId)
		}
  }

	onDeviceChanged(device) {
  }
	onItemChanged(item){
	}
	onDeviceAdded(device) {
  }
	onItemAdded(item){
	}
	onDeviceRemoved(data) {
  }
	onItemRemoved(data){
	}
	onDisconnect() {
	}
	
	checkDefined(object, fields) {
		for (let i = 0; i < fields.length; i++)
			if (object[fields[i]] === undefined) return false
		return true
	}
	

	async getDevices(){
		return await this.sendWithResponse({
			type: 'get-devices'
		})
	}
	async getDeviceSettings(){
		return await this.sendWithResponse({
			type: 'get-device-settings'
		})
	}
	async addDevice({name, type, id, settings}){
		console.log(name, type, id, settings)
		return await this.sendWithResponse({
			'type': 'add-device',
			'device-name': name,  
			'device-type': type, 
			'device-id': id, 
			'device-settings': settings 
		})
	}
	async changeDevice(data){
		const msg = {
			'type': 'update-device',
			...data // name, settings
		}
		console.log(msg)
		return await this.sendWithResponse(msg)
	}
	async removeDevice(id){
		return await this.sendWithResponse({
			'type': 'remove-device', 
			'device-id': id
		})
	}


	async getItems(){
		return await this.sendWithResponse({
			type: 'get-items'
		})
	}
	async getItemSettings(){
		return await this.sendWithResponse({
			type: 'get-item-settings'
		})
	}
	async addItem({name, type, id, settings, deviceId, dataType, storageRangeTime, access}){
		return await this.sendWithResponse({
			'type': 'add-item',
			'item-name': name,  
			'item-type': type, 
			'item-id': id, 
			'item-settings': settings,
			'device-id': deviceId,
			'item-data-type': dataType,
			'item-storage-range-time': storageRangeTime,
			'access': access
		})
	}
	async changeItem(data){
		const msg = {
			'type': 'update-item',
			...data // name, settings, data-type, storage-time-range, ...
		}
		console.log(msg)
		return await this.sendWithResponse(msg)
	}
	async removeItem(id){
		return await this.sendWithResponse({
			'type': 'remove-item', 
			'item-id': id
		})
	}

	async getItemDataStorage(data){
		const msg = {
			'type': 'get-item-data-storage',
			...data
		}
		// console.log(msg)
		return await this.sendWithResponse(msg)
	}

	async getDictionary(){
		return await this.sendWithResponse({
			'type': 'get-dictionary'
		})
	}

	async sendWithResponse(obj){
		const requestId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6)
		obj['request-id'] = requestId

		// try catch and return error from catch
		this.socket.send(JSON.stringify(obj))

		return new Promise((res, rej) => {
			this.requests.set(requestId, res)
		})
	}
    
  changeValue(thing, item, value){
		this.log(thing, item, value)
    this.socket.send(JSON.stringify({'action': 'set', 'thing': thing, 'item': item, 'value': value}))
	}
	
	runMethod(thing, method, parameters){
		this.log(thing, method, parameters)
		console.log(JSON.stringify({'action': 'call', 'thing': thing, 'method': method, 'arguments': parameters }))
    this.socket.send(JSON.stringify({'action': 'call', 'thing': thing, 'method': method, 'arguments': parameters }))
  }

}
