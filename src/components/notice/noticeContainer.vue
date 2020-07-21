<template>
<div class="noticebar">
    <ul>
        <li v-for="(notice) in notices" :key="notice.id">
            <noticeItem :notice="notice" />
        </li>
    </ul>
</div>
</template>

<script>
import {mapState} from "vuex";
import noticeItem from '@/components/notice/noticeItem.vue';
export default {
    components: {
        noticeItem
    },
    computed: {
        ...mapState('notice',['notices'])
    }
}
</script>

<style scoped>
li {list-style: none;}
div.noticebar { 
    position: -webkit-sticky;
    position: sticky;
    bottom: 20px;
    left: 49%;
    width:50%;
    
}
</style>