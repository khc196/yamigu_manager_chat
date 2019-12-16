import Vuex from 'vuex'
import firebase, {auth} from '@/services/fireinit.js'
export const state = () => ({
  authToken: null,
  userInfo : null,
  current_room_title: null,
  current_room_id: null,
  current_room_info: null,
})
export const mutations = {
  SET_AUTH_TOKEN (state, token) {
    state.authToken = token
  },
  SET_USER_INFO (state,info){
    state.userInfo = info
  },
  SET_CURRENT_ROOM_TITLE (state, title) {
      state.current_room_title = title
  },
  SET_CURRENT_ROOM_ID (state, id) {
      state.current_room_id = id;
  },
  SET_CURRENT_ROOM_INFO (state, info) {
      state.current_room_info = info;  
  },
  FIREBASE_SIGN_IN (state, token) {
    //state.firebase_token = token;
    auth.signInWithCustomToken(token)
  },
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.auth) {
        commit('SET_AUTH_TOKEN', req.session.auth)
        commit('SET_USER_INFO', req.session.userInfo)
    }
    else{
        commit('SET_AUTH_TOKEN', null)
        commit('SET_USER_INFO', null)
    }
  }
}
 