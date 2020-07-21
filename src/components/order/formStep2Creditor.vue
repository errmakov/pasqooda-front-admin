<template>
  <div>               
                     <v-row no-gutters>
                      <v-col cols="12" class="pr-10">
                        <p>Кредитор №{{serialNumber}} <v-btn v-if="serialNumber>1" fab elevation="0" x-small color="primary" @click.native="deleteCreditor(creditor.id)"><v-icon dark>mdi-minus</v-icon></v-btn></p>
                        <v-radio-group required :rules="[rulesLegalForm]" row v-model="creditor.legalForm" @change="updateState" >
                          <v-row>
                          <v-col cols="12" sm="5" md="3">
                            <v-radio  label="Физлицо" value="private"></v-radio>
                          </v-col>
                          
                          <v-col cols="12" sm="5" md="3">
                            <v-radio  label="Юрлицо"  value="legal"></v-radio>
                          </v-col>
                          </v-row>
                        </v-radio-group>
                        <div v-show="creditor.legalForm=='legal'">
                          <v-text-field required :rules="[rulesCreditorName]" @change="updateState" label="Название организации *"  v-model="creditor.name"></v-text-field>
                        </div>
                        <div v-show="creditor.legalForm=='private'">
                          <v-text-field  required :rules="[rulesCreditorName]" @change="updateState" label="Фамилия имя отчество *" v-model="creditor.name"></v-text-field>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12" class="pr-10"  sm="6" md="4">
                        <v-text-field @change="updateState" label="Адрес" v-model="creditor.address"></v-text-field>
                      </v-col>
                    
                      <v-col cols="12" class="pr-10"  sm="6" md="4">
                        <v-text-field required :rules="[rulesCreditorPhone]" @change="updateState" label="Телефон *" v-model="creditor.phone"></v-text-field>
                      </v-col>
          
                      <v-col cols="12" class="pr-10"  sm="6" md="4">
                        <v-text-field @change="updateState" label="E-mail" v-model="creditor.email"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12"   sm="6" md="4" class="pr-10">
                        <v-text-field required :rules="[rulesCredit]" @change="updateState" label="Сумма основного долга *" v-model="getCredit" v-model.lazy="getCredit" v-money="money"  ></v-text-field>
                      </v-col>
                      <v-col cols="12"   sm="6" md="4" class="pr-10">
                        <v-text-field @change="updateState" label="Сумма процентов" v-model="getInterest" v-model.lazy="getInterest" v-money="money"></v-text-field>
                      </v-col>
                      <v-col cols="12"   sm="6" md="4" class="pr-10">
                        <v-text-field @change="updateState" label="Сумма штрафов" v-model="getPenalties" v-model.lazy="getPenalties" v-money="money"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12" sm="4" class="pr-10">
                        <v-select :rules="[rulesDocumentName]" @change="updateState" :items="creditDocList" label="Документ по которому возникла задолженность *" v-model="creditor.document.name"></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" class="pr-10">
                        <v-text-field @change="updateState" label="Номер документа, если есть" v-model="creditor.document.number"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="pr-10">
                        <v-menu :close-on-content-click="false" v-model="creditor.document.menu" transition="scale-transition" offset-y  :nudge-right="40" max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field  @change="updateState"  v-on="on" label="Дата документа *" v-model="computedDateFormatted" prepend-icon="mdi-calendar" readonly required :rules="[rulesCreditorDocDate]"></v-text-field>
                            </template>
                            <v-date-picker v-model="creditor.document.date" no-title scrollable actions @input="creditor.document.menu = false" locale="ru-ru">
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                    
  </div>
</template>

<script>
import {VMoney} from 'v-money';
import * as helpers from '@/services/helpers.js';

export default {
    data() {
      return {
        money: helpers.money,
        creditDocList: helpers.doclist  
      }
    },
    directives: {money: VMoney},
    props: {
      creditor: {
        type: Object,
        required: true
      },
      serialNumber: {
        type: Number,
        required: true 
      } 
    },
    computed: {
      getCredit: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.creditor.credit = sumFloat;
          return val;
        },
        get() {
          return this.creditor.credit;
        }
      },
      getInterest: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.creditor.interest = sumFloat;
          return val;
        },
        get() {
          return this.creditor.interest;
        }
      },
      getPenalties: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.creditor.penalties = sumFloat;
          return val;
        },
        get() {
          return this.creditor.penalties;
        }
      },
      computedDateFormatted () {
            return this.formatDate(this.creditor.document.date);
      }
    },
    methods: {
      formatDate (date) {
            if (!date) return null;
            const [year, month, day] = date.split('-');
            return `${day}.${month}.${year}`;
      },
      updateState() {
        this.$emit('updateState');
      },
      deleteCreditor(id) {
        console.log('Going deleteCreditor conponents: ', id)
        this.$store.dispatch('creditor/delete',id);
        this.$store.dispatch('error/deleteAllErrorsByID', {step: 1, id: this.$props.creditor.id});
      },
      rulesLegalForm(value) {
        if (!value) {
          this.$store.dispatch('error/add', {step: 1, name: 'creditorLegalForm_'  + this.$props.creditor.id});
          return 'Нужно выбрать';
        } else {
          this.$store.dispatch('error/delete', {step: 1, name: 'creditorLegalForm_'  + this.$props.creditor.id});
          return true;
        }
      },

      rulesCredit(value) {
        if (!value) {
          this.$store.dispatch('error/add', {step: 1, name: 'creditorCreditSum_'  + this.$props.creditor.id});
          return 'Укажите сумму основного долга';
        } else {
          this.$store.dispatch('error/delete', {step: 1, name: 'creditorCreditSum_'  + this.$props.creditor.id});
          return true;
        }
      },

      rulesDocumentName(value) {
        if (!value) {
          this.$store.dispatch('error/add', {step: 1, name: 'creditorDocumentName_'  + this.$props.creditor.id});
          return 'Укажите документ';
        } else {
          this.$store.dispatch('error/delete', {step: 1, name: 'creditorDocumentName_'  + this.$props.creditor.id});
          return true;
        }
      },
      
      rulesCreditorDocDate(value) {
        if (!value) {
          this.$store.dispatch('error/add', {step: 1, name: 'creditorDocDate_'  + this.$props.creditor.id});
          return 'Укажите дату документа';
        } else {
          this.$store.dispatch('error/delete', {step: 1, name: 'creditorDocDate_'  + this.$props.creditor.id});
          return true;
        }
      },

      rulesCreditorName(value) {
        if (!value) {
          this.$store.dispatch('error/add', {step: 1, name: 'creditorName_'  + this.$props.creditor.id});
          return 'Укажите кредитора';
        } else if (value.length < 5) {
          this.$store.dispatch('error/add', {step: 1, name: 'creditorName_'  + this.$props.creditor.id});
          return '5 знаков минимум';
        } else {
          this.$store.dispatch('error/delete', {step: 1, name: 'creditorName_'  + this.$props.creditor.id});
          return true;
        }
      },
      rulesCreditorPhone(value) {
        if (!value) {
          this.$store.dispatch('error/add', {step: 1, name: 'creditorPhone_'  + this.$props.creditor.id});
          return 'Укажите телефон';
        } else if (value.length < 5) {
          this.$store.dispatch('error/add', {step: 1, name: 'creditorPhone_'  + this.$props.creditor.id});
          return '5 знаков минимум';
        } else {
          this.$store.dispatch('error/delete', {step: 1, name: 'creditorPhone_'  + this.$props.creditor.id});
          return true;
        }
      }
    }
    
    
}
</script>

<style>

</style>