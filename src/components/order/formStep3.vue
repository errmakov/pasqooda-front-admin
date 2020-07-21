<template>
    <div>
        <v-stepper-step step="3" :complete="step > 3" editable>Обязательные платежи</v-stepper-step>
        <v-stepper-content step="3">
            <p><b>Есть ли у вас не оплаченные штрафы?</b></p>
                 <v-radio-group @change="updateState" v-model="registration.hasPenalties" row required :rules="[rulesPenalty]">
                    <v-radio label="Да" value="yes"></v-radio>
                    <v-radio label="Нет"  value="no"></v-radio>
                </v-radio-group>
                <ul v-if="registration.hasPenalties=='yes'">
                    <li v-for="(fine, i) in penalty.penalties" :key="fine.id">
                        <penaltyItem :penalty="fine" :serialNumber="i+1" @updateState="updateState"/>
                    </li>
                </ul>
                <div v-if="(getLength<11) && (registration.hasPenalties == 'yes')">
                    <v-btn @click.native="addPenalty" color="primary" fab x-small elevation="0"><v-icon dark>mdi-plus</v-icon></v-btn> еще штрафы
                </div>

                <p><br/></p>

                <p><b>Есть ли у вас не оплаченные налоги?</b></p>
                <v-radio-group @change="updateState" v-model="registration.hasUnpayTaxes" row required :rules="[rulesTax]">
                    <v-radio label="Да" value="yes"></v-radio>
                    <v-radio label="Нет"  value="no"></v-radio>
                </v-radio-group>
                <ul v-if="registration.hasUnpayTaxes=='yes'">
                    <li v-for="(tx, i) in tax.taxes" :key="tx.id">
                        <taxItem :tax="tx" :serialNumber="i+1" @updateState="updateState"/>
                    </li>
                </ul>
                <div v-if="(getLength<11) && (registration.hasUnpayTaxes=='yes')">
                    <v-btn  @click.native="addTax" color="primary" fab x-small elevation="0"><v-icon dark>mdi-plus</v-icon></v-btn> еще налоги
                </div>
                <br/><br/>
                 

                <v-row>
                    <v-col cols="12" sm="5" md="3">
                        <v-btn color="primary" @click.native="propSetStep(2)">Предыдущий шаг</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="3">
                        <v-btn color="primary" @click.native="propSetStep(4)" :disabled="!propCheckStep(3)">Далее</v-btn>
                    </v-col>
                </v-row>

        </v-stepper-content>        
    </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import penaltyItem from '@/components/order/formStep3Penalty.vue';
import taxItem from '@/components/order/formStep3Tax.vue';
export default {
    components: {
        penaltyItem,
        taxItem
    },
    props: {
        propCheckStep: {type: Function},
        propSetStep: {type: Function},
    },
    methods: {
        updateState() {
            this.$emit('updateState');
        },
        addPenalty() {
            this.$store.dispatch('penalty/add');
        },
        addTax() {
            this.$store.dispatch('tax/add');
        },
        rulesPenalty(value) {
            if (!value) {
                this.$store.dispatch('error/add', {step: 2, name: 'penalty'});
                return 'Нужно выбрать';
            } else {
                this.$store.dispatch('error/delete', {step: 2, name: 'penalty'});
                return true;
            }
        },
        rulesTax(value) {
            if (!value) {
                this.$store.dispatch('error/add', {step: 2, name: 'tax'});
                return 'Нужно выбрать';
            } else {
                this.$store.dispatch('error/delete', {step: 2, name: 'tax'});
                return true;
            }
        }
    },  
    computed: {
        ...mapState(
            ['creditor_count', 'registration', 'step', 'creditor', 'penalty', 'tax']
        ),
        ...mapGetters(
             'penalty', ['getLength']
        ),
        ...mapGetters(
             'tax', ['getLength']
        )
    }

}
</script>

<style scoped>
ul li {
    list-style:none;
    padding:0;
    margin:0;
}
</style>