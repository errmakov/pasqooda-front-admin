<template>
  <div>
  {{serialNumber}}<a :href="orderLink">{{order.registration.contact_name_second}} {{order.registration.contact_name_name}} {{order.registration.contact_name_middle}}</a><br/>
  {{order.registration.contact_phone}} {{order.registration.contact_email}}<br/>
  {{order.filename}}
  </div>
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