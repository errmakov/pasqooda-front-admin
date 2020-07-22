<template>
  <v-row class="pa-0 ma-0 mb-5" no-gutters>
  <v-col cols="1">{{serialNumber}}</v-col><v-col cols="3"><a :href="orderLink">{{order.registration.contact_name_second}} {{order.registration.contact_name_name}} {{order.registration.contact_name_middle}}</a></v-col><v-col cols="2">{{order.registration.contact_phone}}</v-col><v-col cols="3">{{order.registration.contact_email}}</v-col><v-col cols="3">{{order.filename}}</v-col>
  </v-row>
</template>

<script>
export default {
    name: 'searchResultItem',
    data() {
        return {
            orderLink: '/order/' + this.order.id
        }
    },
    props: {
      order: {
        type: Object,
        required: true
      },
      serialNumber: {
        type: Number,
        required: true
      }
    },
}
</script>

<style>

</style>