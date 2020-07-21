<template>
  <div>               
                     <v-row no-gutters>
                      <v-col cols="8" class="pr-10">
                        <p>Должник №{{serialNumber}} <v-btn v-if="serialNumber>1" fab elevation="0" x-small color="primary" @click.native="deleteDebitor(debitor.id)"><v-icon dark>mdi-minus</v-icon></v-btn></p>
                        <v-radio-group row v-model="debitor.legalForm" @change="updateState" >
                        <v-row>
                          <v-col cols="12" sm="5" md="3">
                            <v-radio label="Физлицо" value="private"></v-radio>
                          </v-col>
                          <v-col cols="12" sm="5" md="3">
                            <v-radio label="Юрлицо"  value="legal"></v-radio>
                          </v-col>
                        </v-row>
                        </v-radio-group>
                        <div v-if="debitor.legalForm=='legal'">
                          <v-text-field @change="updateState" label="Название организации"  v-model="debitor.name"></v-text-field>
                        </div>
                        <div v-if="debitor.legalForm=='private'">
                          <v-text-field @change="updateState" label="Фамилия имя отчество" v-model="debitor.name"></v-text-field>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12"   sm="6" md="4"  class="pr-10">
                        <v-text-field @change="updateState" label="Адрес" v-model="debitor.address"></v-text-field>
                      </v-col>
                      <v-col cols="12"   sm="6" md="4"  class="pr-10">
                        <v-text-field @change="updateState" label="Телефон" v-model="debitor.phone"></v-text-field>
                      </v-col>
                      <v-col cols="12"   sm="6" md="4"  class="pr-10">
                        <v-text-field @change="updateState" label="E-mail" v-model="debitor.email"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12"   sm="6" md="4"  class="pr-10">
                        <v-text-field @change="updateState" label="Сумма основного долга" v-model="getDebitorCredit" v-model.lazy="getDebitorCredit" v-money="money"></v-text-field>
                      </v-col>
                      <v-col cols="12"   sm="6" md="4"  class="pr-10">
                        <v-text-field @change="updateState" label="Сумма процентов"  v-model="getDebitorInterest" v-model.lazy="getDebitorInterest" v-money="money"></v-text-field>
                      </v-col>
                      <v-col cols="12"   sm="6" md="4"  class="pr-10">
                        <v-text-field @change="updateState" label="Сумма штрафов"  v-model="getDebitorPenalties" v-model.lazy="getDebitorPenalties" v-money="money"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="12" sm="4" class="pr-10">
                        <v-select :rules="[rulesDocumentName]" @change="updateState" :items="creditDocList" label="Документ по которому возникла задолженность *" v-model="debitor.document.name"></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" class="pr-10">
                        <v-text-field @change="updateState" label="Номер документа, если есть" v-model="debitor.document.number"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="pr-10">
                        <v-menu :close-on-content-click="false" v-model="debitor.document.menu" transition="scale-transition" offset-y  :nudge-right="40" max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field  @change="updateState"  v-on="on" label="Дата документа *" v-model="computedDateFormatted" prepend-icon="mdi-calendar" readonly required :rules="[rulesDebitorDocDate]"></v-text-field>
                            </template>
                            <v-date-picker v-model="debitor.document.date" no-title scrollable actions @input="debitor.document.menu = false" locale="ru-ru">
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
      debitor: {
        type: Object,
        required: true
      },
      serialNumber: {
        type: Number,
        required: true 
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
      deleteDebitor(id) {
        this.$store.dispatch('debitor/delete',id);
      }
    },
    computed: {
      rulesDocumentName(value) {
        if (!value) {
          this.$store.dispatch('error/add', {step: 1, name: 'debitorDocumentName_'  + this.$props.debitor.id});
          return 'Укажите документ';
        } else {
          this.$store.dispatch('error/delete', {step: 1, name: 'debitorDocumentName_'  + this.$props.debitor.id});
          return true;
        }
      },
      rulesDebitorDocDate(value) {
        if (!value) {
          this.$store.dispatch('error/add', {step: 1, name: 'debutorDocDate_'  + this.$props.debitor.id});
          return 'Укажите дату документа';
        } else {
          this.$store.dispatch('error/delete', {step: 1, name: 'debitorDocDate_'  + this.$props.debitor.id});
          return true;
        }
      },
      computedDateFormatted () {
            return this.formatDate(this.debitor.document.date);
      },
      getDebitorCredit: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.debitor.credit = sumFloat;
          return val;
        },
        get() {
          return this.debitor.credit;
        }
      },
      getDebitorInterest: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.debitor.interest = sumFloat;
          return val;
        },
        get() {
          return this.debitor.interest;
        }
      },
      getDebitorPenalties: {
        set(val) {
          let sumFloat = helpers.clearMoney(val);
          this.debitor.penalties = sumFloat;
          return val;
        },
        get() {
          return this.debitor.penalties;
        }
      },
    }    
}
</script>

<style>

</style>