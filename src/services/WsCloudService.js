export default class WsCloudService {

	static instance = null

	resolve = undefined

	waitForResponse(){
		return new Promise((res, rej) => {
			this.resolve = res
		})
	}

	static getInstance(){
		if(WsCloudService.instance === null){
			WsCloudService.instance = new WsCloudService()
		}
		return WsCloudService.instance
	}

	async connect(address) {
		this.log('connecting...')
		this.state = 'connecting'
		this.socket = new WebSocket(address)
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
			if (this.state === 'connecting') this.resolve(false)
			if (this.state === 'authorized') {
				this.onDisconnect()
			}
	    this.state = 'disconnected'
		})
		this.socket.addEventListener('close', (event) => {
			if (this.state === 'connecting') this.resolve(false)
			if (this.state === 'authorized') {
				this.onDisconnect()
			}
	    this.state = 'disconnected'
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
			case 'reply': this.onReply(data.data); break
			case 'device': this.onDeviceChanged(data.device); break
			case 'item': this.onItemChanged(data.item); break
			default: break
		}
	}

	log(text) {
		console.log('Hydra: ', text)
	}

	onDisconnect() {
	}

  onReply(data) {
		if(this.resolve !== undefined){
			this.resolve(data)
			this.resolve = undefined
		}
  }

	onDeviceChanged(device) {
  }

	onItemChanged(item){
	}
	
	checkDefined(object, fields) {
		for (let i = 0; i < fields.length; i++)
			if (object[fields[i]] === undefined) return false
		return true
	}
	

	async getDevices(){
		return await this.sendWithResponse(JSON.stringify({
			type: 'get-devices'
		}))
	}
	async getDeviceSettings(){
		return await this.sendWithResponse(JSON.stringify({
			type: 'get-device-settings'
		}))
	}
	async addDevice({name, type, id, settings}){
		console.log(name, type, id, settings)
		return await this.sendWithResponse(JSON.stringify({
			'type': 'add-device',
			'device-name': name,  
			'device-type': type, 
			'device-id': id, 
			'device-settings': settings 
		}))
	}
	async changeDevice(){
		// not availablу now
	}
	async removeDevice(id){
		return await this.sendWithResponse(JSON.stringify({
			'type': 'remove-device', 
			'device-id': id
		}))
	}


	async getItems(){
		return await this.sendWithResponse(JSON.stringify({
			type: 'get-items'
		}))
	}
	async getItemSettings(){
		return await this.sendWithResponse(JSON.stringify({
			type: 'get-item-settings'
		}))
	}
	async addItem(name, type, id, settings, deviceId, dataType, storageTimeRange){
		return await this.sendWithResponse(JSON.stringify({
			'type': 'add-item',
			'item-name': name,  
			'item-type': type, 
			'item-id': id, 
			'item-settings': settings,
			'device-id': deviceId,
			'item-data-type': dataType,
			'item-storage-time-range': storageTimeRange
		}))
	}
	async changeItem(){
		// not availablу now
	}
	async removeItem(id){
		return await this.sendWithResponse(JSON.stringify({
			'type': 'remove-item', 
			'item-id': id
		}))
	}

	async sendWithResponse(string){
		// return new Promise((res, rej) => {
		this.socket.send(string)
		return await this.waitForResponse()
		// })
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
