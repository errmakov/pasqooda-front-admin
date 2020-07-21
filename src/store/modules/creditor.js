function getRandomID() {
    let date = new Date();
    return Math.round(Math.random() * (10000000000 - 1000) + 1000) + date.getTime();
}

export const namespaced = true

let nextID = getRandomID();

let creditor = {
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
    creditors: [creditor]
}

export const mutations = {
    ADD_CREDITOR(state) {
        nextID = getRandomID();
        state.creditors.push({
          ...creditor,
          id: nextID
        })
      },
      DELETE_CREDITOR(state,removeID) {
        state.creditors = state.creditors.filter(
          creditor => creditor.id !== removeID
        )
      }
}

export const actions = {
    add({commit}) {
        commit('ADD_CREDITOR') 
      },
    delete({commit},id) {
        commit('DELETE_CREDITOR',id);
      },
}

export const getters = {
    getLength: state => {
      return state.creditors.length;
    }
}