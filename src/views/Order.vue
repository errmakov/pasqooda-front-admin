<template>
    <div>
    <v-progress-linear v-if="loading !== null" active indeterminate striped top color="light-blue"></v-progress-linear>
    <appForm v-if="loading == null" ref="appForm"/>
        
    </div>
</template>

<script>
import appForm from '@/components/order/form.vue';
import axios from "axios";
import {mapState} from "vuex";
export default {
    components: {
        appForm
    },
    data() {
        return {
            loading: null
        }
    },
    mounted: function() {
        this.loading = 1;
        console.log(this.$route.params.order_id);
        axios.get(this.appConfig.apiUrl + '/admin/user/' + this.$route.params.order_id)
        .then((response)=>{
            console.log('Got response', response.data);
            this.$store.dispatch('updateRegistration', response.data);
            this.$store.dispatch('setStep', 1);
        })
        .catch((err)=>{
            this.$store.dispatch('notice/add', {type: 'error', message: 'Ошибка при получении заявки: ' + err.message}, {root: true})
        })
        .finally(()=>{
            this.loading = null;
        })
        
    },
    computed: {
        ...mapState(['registration', 'step']),
    }
};
</script>

<style></style>
