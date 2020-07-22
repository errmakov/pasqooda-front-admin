<template>
<div>
<v-form action="https://postman-echo.com/post" method="post" id="searchForm" @submit.prevent="formSubmit">
          <v-text-field @keyup="formSubmit" @paste="formSubmit" label="Пиши что-нибудь"  v-model="searchString" name="searchString"></v-text-field>  
</v-form>

    <v-row class="pa-0 ma-0" v-for="(order, i) in searchResults" :key="order.id">
        <v-col class="pa-0 ma-0"><searchResultItem :order="order" :serialNumber="i+1"/></v-col>
    </v-row>


</div>
</template>

<script>
import axios from "axios";
import searchResultItem from '@/components/searchResultItem.vue';
export default {
    name: 'searchForm',
    components: {
        searchResultItem
    },
    data() {
        return {
            searchString: '',
            searchResults: null
        }
    },
    methods: {
        formSubmit() {
            if (this.searchString.length>=3) {
                console.log('Going search for: ' + this.searchString);
                axios.post(this.appConfig.apiUrl + '/admin/search', {keyword:this.searchString})
                    .then((response)=>{
                        if (response.data.res === 'OK') {
                            console.log('API Search response is OK')
                        } else { // got response with errors
                            console.log('Error from API', response.data.message);
                            this.$store.dispatch('notice/add', {type: 'error', message: response.data.message}, {root: true})
                        }
                        console.log(response.data.message);
                        let temp = response.data.message;
                        this.searchResults = temp.reverse();
                    })
                    .catch((err)=>{
                        this.$store.dispatch('notice/add', {type: 'error', message: err.message}, {root: true})
                    })
            }
            
        }
    }
}
</script>

<style>
ul {list-style:none}
li {list-style:none}
ol {list-style:none}
</style>