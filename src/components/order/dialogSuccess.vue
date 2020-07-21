<template>
 <div> 
  <v-row justify="center">
    <v-dialog v-model="isVisibleSuccess" persistent max-width="100%">
      
      <v-card>
        <v-card-title class="headline">Мы уже занимаемся вашим вопросом!</v-card-title>
        
        <v-card-text>Ваше заявление на банкроство будет готово сразу после оплаты.
        <br/><br/>
        <v-btn color="blue darken-1  white--text" @click="doCheckout()">Оплатить 300р сейчас</v-btn>
        <br/><br/>
         <span v-if="registration.contact_email!==null">Ссылка на оплату также у вас на почте <b>{{registration.contact_email}}</b>. Мы отправили туда письмо.</span>
        </v-card-text>
        
        <v-card-actions class="justify-center">
          <v-btn color="blue darken-1" text @click.stop="resetSuccess">Я рад!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</div>
</template>


<script>
import {mapState} from "vuex";
export default {
    data() {
        return {
            visible: false
        }
    },
   
    methods: {
        resetSuccess() {
            this.visible = false;
        },
        doCheckout() {
            window.location = this.payment.paylink;
        }
    },
    computed: {
        ...mapState(['loading', 'registration', 'payment']),
       
        isVisibleSuccess() {
            if ((this.loading == 2) && (this.visible == true)) {
                return true;
            } else {
                return false;
            }
        }
    
    }

}
</script>

<style>

</style>