<template>
<div class="notice"> 
   <v-alert :type="notice.type" dismissible>
    {{notice.message}}
   </v-alert>
</div>
</template>

<script>
import {mapActions} from "vuex";
export default {
    props: {
        notice: {
            required: true,
            type: Object
        }
    },
    methods: {
        ...mapActions('notice',['delete']),
    },
    mounted() {
        this.timeout = setTimeout(()=>{
            this.delete(this.notice.id)
        }, 6000)
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
    },
}
</script>

<style scoped>
    
</style>