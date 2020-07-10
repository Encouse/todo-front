import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    events: [],
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    last_changed_event: null,
  },
  mutations: {
      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token){
        state.status = 'success'
        state.token = token
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
      },
      setItems(state, items) {
        state.events = items
      },
      lastChanged(state, event) {
        state.last_changed_event = event
      },
      eventDeletion(state, event) {
        console.log(event);
      }
  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://127.0.0.1:8000/auth/login/', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Token ' + token
            commit('auth_success', token)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
      register({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://127.0.0.1:8000/auth/register/', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.Token
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Token ' + token
            commit('auth_success', token)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
      logout({commit}){
       return new Promise((resolve) => {
         commit('logout')
         localStorage.removeItem('token')
         delete axios.defaults.headers.common['Authorization']
         resolve()
       })
     },
     fetchEvents({commit}) {
       return new Promise((resolve, reject) => {
         axios({url: 'http://127.0.0.1:8000/events', method: 'GET'})
         .then(res => {
           commit('setItems', res.data.results)
           resolve()
         })
         .catch(err => {
           console.log(err)
           reject(err)
         })
       })
     },
     changeEvent({commit}, event) {
       return new Promise((resolve, reject) =>{
         console.log(event);
         axios({url: `http://127.0.0.1:8000/events/${event.id}/`, data: event, method: 'PUT'})
          .then(res => {
            commit('lastChanged', event)
            this.closeOverlay()
            resolve()
            return res
          })
          .catch((err) => {
            console.log(err.response);
            reject()
          })
       })
     },
     createEvent({commit}, event) {
       return new Promise((resolve, reject) => {
         axios({url: `http://127.0.0.1:8000/events/`, data: event, method: 'POST'})
          .then(() => {
            commit('lastChanged', event)
            resolve()
          })
          .catch(err => {
            console.log(err.response);
            reject()
          })
       })
     },
     deleteEvent({commit}, id) {
       return new Promise((resolve, reject) => {
         axios({url: `http://127.0.0.1:8000/events/${id}/`, method: 'DELETE'})
          .then(() => {
            commit('eventDeletion')
            resolve()
          })
          .catch(err => {
            console.log(err);
            reject()
          })
       })
     },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getEvents: state => state.events
  }
})
