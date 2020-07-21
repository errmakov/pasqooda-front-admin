
<template>
<div>
    <p>Объект №{{serialNumber}}  <v-btn v-if="serialNumber>1" fab elevation="0" x-small color="primary" @click.native="deleteRealty(realty.id)"><v-icon dark>mdi-minus</v-icon></v-btn></p>
    <v-text-field label="Название" @change="updateState" v-model="realty.name"></v-text-field>

    <v-text-field label="Кадастровый номер" @change="updateState" v-model="realty.cadastral"></v-text-field>

    <v-text-field label="Площадь" @change="updateState" v-model="realty.square"></v-text-field>
    
    <v-text-field label="Адрес" @change="updateState"  v-model="realty.address"></v-text-field>

    <v-text-field label="Приблизительная стоимость" @change="updateState"  v-model="getRealtyPrice" v-model.lazy="getRealtyPrice" v-money="money"></v-text-field>
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
        realty: {
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
        deleteRealty(id) {
            this.$store.dispatch('realty/delete',id);
        }
    },
    computed: {
        getRealtyPrice: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.realty.price = sumFloat;
          return val;
        },
        get() {
          return this.realty.price;
        }
      }
    }
}
</script>

<style scoped>
</style>

