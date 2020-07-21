function getRandomID() {
    let date = new Date();
    return Math.round(Math.random() * (10000000000 - 1000) + 1000) + date.getTime();
}

export const namespaced = true

let nextID = getRandomID();

let note = {
    id: nextID,
    type: null,
    message: null
}

export const state = {
    notices: []
}

export const mutations = {
    ADD_NOTICE(state, newNotice) {
        nextID = getRandomID();
        state.notices.push({
          ...note,
          id: nextID,
          type: newNotice.type,
          message: newNotice.message
        })
      },
      DELETE_NOTICE(state,removeID) {
        state.notices = state.notices.filter(
          notice => notice.id !== removeID
        )
      }
}

export const actions = {
    add({commit}, newNotice) {
        commit('ADD_NOTICE', newNotice) 
    },
    delete({commit},id) {
        console.log()
        commit('DELETE_NOTICE',id);
    },
}
