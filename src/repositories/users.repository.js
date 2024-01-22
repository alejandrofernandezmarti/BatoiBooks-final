const SERVER = import.meta.env.VITE_URL_API

export default class UserRepository {
  constructor() {}
  async getAllUsers() {
    let response = await fetch(SERVER + '/modules')
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }
  async getUserById(id) {
    let response = await fetch(SERVER + '/modules/' + id)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }
  async addUser(user) {
    // let sentencia = {"id":user.id,"email": user.email,"nick":user.nick ,"price": user.price, "password": user.password}
    const response = await fetch(SERVER + '/modules', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async removeUser(id) {
    const response = await fetch(SERVER + '/modules/' + id, { method: 'DELETE' })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }

  async changeUser(user) {
    let sentencia = {
      id: user.id,
      email: user.email,
      nick: user.nick,
      price: user.price,
      password: user.password
    }
    const response = await fetch(SERVER + '/modules/' + user.id, {
      method: 'PUT',
      body: JSON.stringify(sentencia),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return await response.json()
  }
  async updateUserPassword(id, password) {
    let campos = { password: password }
    const response = await fetch(SERVER + '/modules/' + id, {
      method: 'PATCH',
      body: JSON.stringify(campos),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    return response.json()
  }
}
