<template>
  <v-app>
    <v-container fluid style="max-width:1200px;">
      <appHeader />
      <router-view />
    </v-container>
    <noticeContainer />
    
    
  </v-app>
  
</template>




<script>
import appHeader from '@/components/header.vue';

import noticeContainer from '@/components/notice/noticeContainer.vue';



export default {
  name: 'App',
  components: {
    appHeader,
    noticeContainer
  },
  created () {
    // const $script = document.createElement('script')
    // $script.async = true
    // $script.src = 'https://www.google.com/recaptcha/api.js?render=6LdpD_gUAAAAAOvcFYzJki1dz8ZOpQQ5uVxS7BxL'
    // document.head.appendChild($script)

  },
  mounted() {
    console.log('Running on stage: ', this.appConfig.stage);
  }

}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
  @import url('https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css');
  @import url('https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css');
  @import './assets/styles/app.css';
  .grecaptcha-badge { opacity:0;}
</style>


