function getRandomID() {
    let date = new Date();
    return Math.round(Math.random() * (10000000000 - 1000) + 1000) + date.getTime();
}

export const namespaced = true

let nextID = getRandomID();

let realty = {
    id: nextID,
    name: null,
    cadastral: null,
    square: null,
    address: null,
    price: null
}

export const state = {
    estates: [realty]
}

export const mutations = {
    ADD_REALTY(state) {
        nextID = getRandomID();
        state.estates.push({
          ...realty,
          id: nextID
        })
      },
      DELETE_REALTY(state,removeID) {
        state.estates = state.estates.filter(
          realty => realty.id !== removeID
        )
      }
}

export const actions = {
    add({commit}) {
        commit('ADD_REALTY') 
      },
    delete({commit},id) {
        commit('DELETE_REALTY',id);
        nextID--; 
      },
}

export const getters = {
    getLength: state => {
      return state.estates.length;
    }
}