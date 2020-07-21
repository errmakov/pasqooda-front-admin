function getRandomID() {
    let date = new Date();
    return Math.round(Math.random() * (10000000000 - 1000) + 1000) + date.getTime();
}

export const namespaced = true

let nextID = getRandomID();

let tax = {
    id: nextID,
    requisites: null,
    amount: null,
    fine: null,
    peny: null
}

export const state = {
    taxes: [tax]
}

export const mutations = {
    ADD_TAX(state) {
        nextID = getRandomID();
        state.taxes.push({
          ...tax,
          id: nextID
        })
      },
      DELETE_TAX(state,removeID) {
        state.taxes = state.taxes.filter(
          penalty => penalty.id !== removeID
        )
      }
}

export const actions = {
    add({commit}) {
        commit('ADD_TAX') 
      },
    delete({commit},id) {
        commit('DELETE_TAX',id);
        nextID--; 
      },
}

export const getters = {
    getLength: state => {
      return state.taxes.length;
    }
}