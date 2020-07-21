<template>
    <v-card class="pt-10 px-10 mb-10" flat tile>
        <v-row no-gutters>
            <v-col cols="12" sm="2" center>
              <router-link to="/">Админ очка</router-link>
            </v-col>
            <v-col cols="12" sm="10">
                    <nav>
                        <v-row no-gutters class="pt-10">
                            <v-col v-for="link in links" :key="link.href" cols="4" sm="1"><router-link :to="link.href">{{link.title}}</router-link></v-col>
                        </v-row>
                    </nav>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {title: 'Главная', href: '/'},
            ]
        }
    }
    
}
</script>

<style>
  
</style>