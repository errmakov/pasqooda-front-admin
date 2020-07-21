function getRandomID() {
    let date = new Date();
    return Math.round(Math.random() * (10000000000 - 1000) + 1000) + date.getTime();
}

export const namespaced = true

let nextID = getRandomID();

let penalty = {
    id: nextID,
    requisites: null,
    amount: null
}

export const state = {
    penalties: [penalty]
}

export const mutations = {
    ADD_PENALTY(state) {
        nextID = getRandomID();
        state.penalties.push({
          ...penalty,
          id: nextID
        })
      },
      DELETE_PENALTY(state,removeID) {
        state.penalties = state.penalties.filter(
          penalty => penalty.id !== removeID
        )
      }
}

export const actions = {
    add({commit}) {
        commit('ADD_PENALTY') 
      },
    delete({commit},id) {
        commit('DELETE_PENALTY',id);
        nextID--; 
      },
}

export const getters = {
    getLength: state => {
      return state.penalties.length;
    }
}