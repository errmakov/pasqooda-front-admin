import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist';
import * as creditor from "@/store/modules/creditor.js";
import * as debitor from "@/store/modules/debitor.js";
import * as penalty from "@/store/modules/penalty.js";
import * as tax from "@/store/modules/tax.js";
import * as movable from "@/store/modules/movable.js";
import * as realty from "@/store/modules/realty.js";
import * as error from "@/store/modules/error.js";
import * as notice from "@/store/modules/notice.js";

const vuexLocal = new VuexPersistence({
  key: "pasqooda",
  storage: localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    registration: {
      contact_name_second: null,
      contact_name_name: null,
      contact_name_middle: null,
      contact_gender: null,
      pass_number:null,
      pass_emitter:null,
      pass_date_menu: false,
      pass_date:null,
      regadress:null,
      contact_email:null,
      contact_phone:null
    },  
    updated: null,
    step: 1,
    loading: null, // NULL - loading is not in progress, 1 - loading in progress, 2 - done, form sended
    payment: {
      paylink: null,
      payid: null
    }
  
  },
  mutations: {
    SET_LOADING(state, loadStatus) {
      state.loading = loadStatus;
    },
    SET_PAYMENT(state, paydetails) {
      state.payment = paydetails;
    },
    SET_STEP(state,step) {
      state.step = step;
    },
    UPDATE(state, time) {
      state.updated = time;
    },
    UPDATE_REGISTRATION(state, order) {
      
      state.filename = order.body.filename;
      state.payment= order.body.payment;
      state.registration = order.body.registration;
      state.creditor.creditors = order.body.creditors;
      state.penalty.penalties = (order.body.penalties) ? order.body.penalties : Array();
      state.tax.taxes = (order.body.taxes) ? order.body.taxes : Array();
      state.movable.properties = (order.body.movable) ? order.body.movable : Array();
      state.realty.estates = (order.body.realty) ? order.body.realty : Array();
      state.debitor.debitors = (order.body.debitors) ? order.body.debitors : Array();
      let errors = Array();
      state.error.errors = errors;
    },
  },
  actions: {
    updateRegistration({commit}, order) {
      commit('UPDATE_REGISTRATION', order);
    },
    updateState({commit}) {
      let upDate = new Date();
      let time = upDate.getTime();
      commit('UPDATE', time);
    },
    setStep({commit}, step) {
      commit('SET_STEP', step);
    },
    setLoading({commit}, loadStatus) {
      commit('SET_LOADING', loadStatus);
    },
    setPayment({commit}, paydetails) {
      commit('SET_PAYMENT', paydetails);
    }
  },
  modules: {
    creditor,
    debitor,
    penalty,
    tax,
    realty,
    movable,
    error,
    notice
  }
});
