
<template>
<div>
    <p>Налог №{{serialNumber}}  <v-btn v-if="serialNumber>1" fab elevation="0" x-small color="primary" @click.native="deleteTax(tax.id)"><v-icon dark>mdi-minus</v-icon></v-btn></p>
    <v-text-field label="Реквизиты постановления" @change="updateState" v-model="tax.requisites"></v-text-field>

    <v-text-field label="Сумма основного долга" @change="updateState"  v-model="getTaxAmount" v-model.lazy="getTaxAmount" v-money="money"></v-text-field>

    <v-text-field label="Сумма штрафа" @change="updateState" v-model="getTaxFine" v-model.lazy="getTaxFine" v-money="money"></v-text-field>
    
    <v-text-field label="Пени" @change="updateState"  v-model="getTaxPeny" v-model.lazy="getTaxPeny" v-money="money"></v-text-field>
    <br/>
</div>
</template>

<script>
import {VMoney} from 'v-money';
import * as helpers from '@/services/helpers.js';
export default {
    data() {
        return {
            money: helpers.money,
        }
    }, 
    directives: {money: VMoney},
    props: {
        tax: {
            type: Object,
            required: true
        },
        serialNumber: {
            type: Number,
            required: true 
        } 
        },
    methods: {
        updateState() {
            this.$emit('updateState');
        },
        deleteTax(id) {
            this.$store.dispatch('tax/delete',id);
        }
    },
    
    computed: {
        getTaxAmount: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.tax.amount = sumFloat;
          return val;
        },
        get() {
          return this.tax.amount;
        }
      },
      getTaxFine: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.tax.fine = sumFloat;
          return val;
        },
        get() {
          return this.tax.fine;
        }
      },
      getTaxPeny: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.tax.peny = sumFloat;
          return val;
        },
        get() {
          return this.tax.peny;
        }
      }
    }
}
</script>

<style scoped>
</style>

