function getRandomID() {
    let date = new Date();
    return Math.round(Math.random() * (10000000000 - 1000) + 1000) + date.getTime();
}

export const namespaced = true

let nextID = getRandomID();

let movable = {
    id: nextID,
    name: null,
    vin: null,
    price: null
}

export const state = {
    properties: [movable]
}

export const mutations = {
    ADD_MOVABLE(state) {
        nextID = getRandomID();
        state.properties.push({
          ...movable,
          id: nextID
        })
      },
    DELETE_MOVABLE(state,removeID) {
        state.properties = state.properties.filter(
          movable => movable.id !== removeID
        )
      }
}

export const actions = {
    add({commit}) {
        commit('ADD_MOVABLE') 
      },
    delete({commit},id) {
        commit('DELETE_MOVABLE',id);
        nextID--; 
      },
}

export const getters = {
    getLength: state => {
      return state.properties.length;
    }
}