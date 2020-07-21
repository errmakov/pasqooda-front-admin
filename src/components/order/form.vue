<template>
<div>
  <v-stepper v-model="step" vertical non-linear>
   <v-form action="https://postman-echo.com/post" method="post" id="form_bankruptcy" @submit.prevent="formSubmit">
            <formStep1 :propCheckStep="checkStep"  :propSetStep="setStep" @updateState="updateState"/>
            <formStep2 :propCheckStep="checkStep"  :propSetStep="setStep" @updateState="updateState" />
            <formStep3 :propCheckStep="checkStep"  :propSetStep="setStep" @updateState="updateState" />
            <formStep4 :propCheckStep="checkStep"  :propSetStep="setStep" @updateState="updateState" />
            <formStep5 :propCheckStep="checkStep"  :propSetStep="setStep" @updateState="updateState"/>
            <v-row>
                    <v-col cols="12" sm="4" md="3" class="pl-15">
                        <v-btn  v-if="(loading !== 1)" color="primary" type="submit">Отправить</v-btn>
                        <v-progress-circular v-if="(loading == 1)" indeterminate color="primary" size="64" width="6"></v-progress-circular>
                    </v-col>
            </v-row>
                 
            
        </v-form>
    </v-stepper>
</div>
</template>

<script>
import formStep1 from '@/components/order/formStep1.vue';
import formStep2 from '@/components/order/formStep2.vue';
import formStep3 from '@/components/order/formStep3.vue';
import formStep4 from '@/components/order/formStep4.vue';
import formStep5 from '@/components/order/formStep5.vue';
import {mapState, mapGetters} from "vuex";
import axios from "axios";

export default {
    components: {
        formStep1,
        formStep2,
        formStep3,
        formStep4,
        formStep5
    },
    data() {
        return {
            
        }
    },
    mounted() {
        if (this.loading == 1) {
            this.$store.dispatch('setLoading', null);
        }
    },
    methods: {
        updateState() {
            this.$store.dispatch('updateState');
        },
        setStep(step) {
            this.$store.dispatch('setStep',step);
        },
        checkStep(s) {
            s = s - 1;
            let noErrors = true;
            for (let i in this.errors) {
                if (this.errors[i].step == s) {
                    noErrors = false;
                }
            }
            return noErrors;
        },
        
        formSubmit() {
            console.log('submitted');
                this.$store.dispatch('setLoading', 1);
                let postData = {
                    registration: this.registration,
                    creditors: this.creditors,
                    timestamp: Date.now(),
                };
                if (this.registration.hasDebitors === 'yes') {
                    postData.debitors = this.debitors;
                }
                if (this.registration.hasPenalties === 'yes') {
                    postData.penalties = this.penalties;
                }
                if (this.registration.hasUnpayTaxes === 'yes') {
                    postData.taxes = this.taxes;
                }
                if (this.registration.hasRealty === 'yes') {
                    postData.realty = this.estates;
                }
                if (this.registration.hasMovables === 'yes') {
                    postData.movable = this.properties;
                }
                postData.filename = this.filename;
                postData.payment = this.payment;

                axios.post(this.appConfig.apiUrl + '/admin/user/'+this.$route.params.order_id, postData)
                .then((response)=>{
                        if (response.data.res === 'OK') {
                            this.$store.dispatch('setLoading', null);
                            this.$store.dispatch('notice/add', {type: 'success', message: 'Сохранили'}, {root: true});
                        } else { // got response with errors
                            console.log('Error from API', response.data.message);
                            this.$store.dispatch('setLoading', null);
                            this.$store.dispatch('notice/add', {type: 'error', message: response.data.message}, {root: true})
                        }
                    console.log(response.data)
                })
                .catch((err)=>{
                    this.$store.dispatch('setLoading', null);
                    console.log('Something wrong: ', err)
                    this.$store.dispatch('notice/add', {type: 'error', message: err.message}, {root: true})
                })
            
            
            
        }
    },
    computed: {
        ...mapState(['creditor_count', 'registration','step', 'loading', 'payment', 'filename']),
        ...mapState('creditor',['creditors']),
        ...mapState('debitor',['debitors']),
        ...mapState('penalty',['penalties']),
        ...mapState('tax',['taxes']),
        ...mapState('realty',['estates']),
        ...mapState('movable',['properties']),
        ...mapState('error',['errors']),
        ...mapGetters(
            'creditor', ['getLength']
        ),
       
        
    }
}
</script>

<style>

</style>