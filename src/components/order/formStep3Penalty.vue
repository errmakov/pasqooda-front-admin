<template>
<div>
    <p>Штраф №{{serialNumber}}  <v-btn v-if="serialNumber>1" fab elevation="0" x-small color="primary" @click.native="deletePenalty(penalty.id)"><v-icon dark>mdi-minus</v-icon></v-btn></p>
    <v-text-field @change="updateState" label="Реквизиты постановления" v-model="penalty.requisites"></v-text-field>
    <v-text-field @change="updateState" label="Сумма штрафа" v-model="getPenalty" v-model.lazy="getPenalty" v-money="money"></v-text-field>
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
        penalty: {
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
        deletePenalty(id) {
            this.$store.dispatch('penalty/delete',id);
        }
    },
    computed: {
        getPenalty: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.penalty.amount = sumFloat;
          return val;
        },
        get() {
          return this.penalty.amount;
        }
      }
    }
}
</script>

<style scoped>
</style>

