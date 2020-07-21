
export const namespaced = true


let error = {
    step: null,
    name: null
}

export const state = {
    errors: []
}

export const mutations = {
  
    ADD_ERROR(state, err) {
        state.errors.push({
          ...error,
          step: err.step,
          name: err.name,
        })
      },
      DELETE_ERROR(state,err) {
        state.errors = state.errors.filter(
          errorItem => (errorItem.name !== err.name)
        )
      },
      DELETE_ERROR_ALL(state,err) {
        state.errors = state.errors.filter(
          errorItem => (!errorItem.name.match(new RegExp(err.id)))
        )
      }
}

export const actions = {

    add({commit, state}, err) {
      let found = false;      
      
      //console.log('State ', state);
      let arr = state.errors;
      for (let k in arr) {
        if (arr[k].name == err.name) {
          found = true;
        }
      }
      if (!found) {
        commit('ADD_ERROR', err);
      } 
        
    
    },
    delete({commit, state}, err) {
      let arr = state.errors;
      for (let k in arr) {
        if (arr[k].name == err.name) {
          commit('DELETE_ERROR', err);
        }
      }        
    },

    deleteAllErrorsByID({commit}, err) {
      commit('DELETE_ERROR_ALL', {id:err.id});
    }
}

export const getters = {
    getErrors: state => {
      return state.errros;
    }
}