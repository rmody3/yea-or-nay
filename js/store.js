class Store{
  constructor(){
    this.state = {}
  }


  add(resource, key, object){
    this.state[resource] = this.state[resource] || {}
    this.state[resource][key] = object
  }

  find(resource, key){
    this.state[resource] = this.state[resource] || {}
    return this.state[resource][key]
  }

}

let store = new Store()
