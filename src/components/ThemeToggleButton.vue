<script setup lang="ts">
import {useTheme} from "vuetify"

const theme = useTheme()

function toggleTheme(){
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-btn icon @click="toggleTheme">
    <v-icon v-if="theme.global.name.value == 'dark'" color="white">mdi-white-balance-sunny</v-icon>
    <v-icon v-else color="black">mdi-moon-waxing-crescent</v-icon>
  </v-btn>
</template>

<style scoped>

</style>
