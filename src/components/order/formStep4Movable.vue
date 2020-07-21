
<template>
<div>
    <p>Объект №{{serialNumber}}  <v-btn v-if="serialNumber>1" fab elevation="0" x-small color="primary" @click.native="deleteMovable(movable.id)"><v-icon dark>mdi-minus</v-icon></v-btn></p>
    <v-text-field label="Название" @change="updateState" v-model="movable.name"></v-text-field>

    <v-text-field label="VIN (для авто)" @change="updateState" v-model="movable.vin"></v-text-field>

    <v-text-field label="Приблизительная стоимость" @change="updateState" v-model="getMovablePrice" v-model.lazy="getMovablePrice" v-money="money"></v-text-field>
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
        movable: {
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
            this.$store.dispatch('movable/delete',id);
        }
    },
    computed: {
        getMovablePrice: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.movable.price = sumFloat;
          return val;
        },
        get() {
          return this.movable.price;
        }
      }
    }
}
</script>

<style scoped>
</style>

