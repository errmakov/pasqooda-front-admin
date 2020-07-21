function getRandomID() {
    let date = new Date();
    return Math.round(Math.random() * (10000000000 - 1000) + 1000) + date.getTime();
}

export const namespaced = true

let nextID = getRandomID();

let debitor = {
    id: nextID,
    name: null,
    legalForm: null,
    address: null,
    phone: null,
    email: null,
    credit: null,
    interest: null,
    penalties: null,
    document: {name: null, date: null, number: null}
}

export const state = {
    debitors: [debitor]
}

export const mutations = {
    ADD_DEBITOR(state) {
        nextID = getRandomID();
        state.debitors.push({
          ...debitor,
          id: nextID
        })
      },
      DELETE_DEBITOR(state,removeID) {
        state.debitors = state.debitors.filter(
          debitor => debitor.id !== removeID
        )
      }
}

export const actions = {
    add({commit}) {
        commit('ADD_DEBITOR') 
      },
    delete({commit},id) {
        commit('DELETE_DEBITOR',id);
        nextID--; 
      },
}

export const getters = {
    getLength: state => {
      return state.debitors.length;
    }
}