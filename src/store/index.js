import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  getters: {
  },
  mutations: {
    addCount (state, count) {
      state.count += count
    }
  },
  actions: {
    asyncAddCount (context, payload) {
      setTimeout(() => {
        context.commit('addCount', payload.count)
        console.log(payload.delay)
      }, payload.delay)
    }
  },
  modules: {
  }
})
