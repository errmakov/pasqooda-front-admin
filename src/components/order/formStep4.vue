<template>
    <div>
        <v-stepper-step step="4" :complete="step > 4" editable>Имущество</v-stepper-step>
        <v-stepper-content step="4">
            <p><b>Есть ли у вас недвижимое имущество?</b></p>
                 <v-radio-group @change="updateState" v-model="registration.hasRealty" row required :rules=[rulesRealty]>
                    <v-radio label="Да" value="yes"></v-radio>
                    <v-radio label="Нет"  value="no"></v-radio>
                </v-radio-group>
                <ul v-if="registration.hasRealty=='yes'">
                    <li v-for="(estate, i) in realty.estates" :key="estate.id">
                        <realtyItem :realty="estate" :serialNumber="i+1" @updateState="updateState"/>
                    </li>
                </ul>
                <div v-if="(getLength<11) && (registration.hasRealty=='yes')">
                    <v-btn @click.native="addRealty" color="primary" fab x-small elevation="0"><v-icon dark>mdi-plus</v-icon></v-btn> еще недвижимость
                </div>

                <p><br/></p>

                <p><b>Есть ли у вас движимое имущество?</b></p>
                <v-radio-group @change="updateState" v-model="registration.hasMovables" row required :rules=[rulesMovable]>
                    <v-radio label="Да" value="yes"></v-radio>
                    <v-radio label="Нет"  value="no"></v-radio>
                </v-radio-group>
                <ul v-if="registration.hasMovables=='yes'">
                    <li v-for="(mov, i) in movable.properties" :key="mov.id">
                        <movableItem :movable="mov" :serialNumber="i+1" @updateState="updateState"/>
                    </li>
                </ul>
                <div v-if="(getLength<5) && (registration.hasMovables=='yes')">
                    <v-btn  @click.native="addMovable" color="primary" fab x-small elevation="0"><v-icon dark>mdi-plus</v-icon></v-btn> еще движимое имущество
                </div>
                <br/><br/>
                
                <v-row>
                    <v-col cols="12" sm="5" md="3">
                        <v-btn color="primary" @click.native="propSetStep(3)">Предыдущий шаг</v-btn>
                    </v-col>
                    <v-col cols="12" sm="4" md="3">
                        <v-btn @click.native="propSetStep(5)" color="primary"  :disabled="!propCheckStep(4)">Далее</v-btn>
                    </v-col>
                </v-row>
        </v-stepper-content>        
    </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import realtyItem from '@/components/order/formStep4Realty.vue';
import movableItem from '@/components/order/formStep4Movable.vue';
export default {
    components: {
        realtyItem,
        movableItem
    },
    props: {
        propCheckStep: {type: Function},
        propSetStep: {type: Function},
    },
    methods: {
        updateState() {
            this.$emit('updateState');
        },
        addRealty() {
            this.$store.dispatch('realty/add');
        },
        addMovable() {
            this.$store.dispatch('movable/add');
        },
        rulesRealty(value) {
            if (!value) {
                this.$store.dispatch('error/add', {step: 3, name: 'realty'});
                return 'Нужно выбрать';
            } else {
                this.$store.dispatch('error/delete', {step: 3, name: 'realty'});
                return true;
            }
        },
        rulesMovable(value) {
            if (!value) {
                this.$store.dispatch('error/add', {step: 3, name: 'movable'});
                return 'Нужно выбрать';
            } else {
                this.$store.dispatch('error/delete', {step: 3, name: 'movable'});
                return true;
            }
        }
    },  
    computed: {
        ...mapState(
            ['creditor_count', 'registration', 'step', 'creditor', 'penalty', 'tax', 'realty', 'movable']
        ),
        ...mapGetters(
             'realty', ['getLength']
        ),
        ...mapGetters(
             'movable', ['getLength']
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