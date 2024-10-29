<script setup lang="ts">
import VueJsonPretty from "vue-json-pretty";
import 'vue-json-pretty/lib/styles.css';
import {ref, type Ref} from "vue";

let showDialogBox : Ref<boolean> = ref(true);
const props = defineProps({
  data:{
    required: true,
    type: Object
  }
})
</script>


<template>
  <v-dialog v-model="showDialogBox" width="900px">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Echoed Shortest Path Result</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            icon="mdi-close"
            @click="$emit('close')"
          />
        </v-toolbar-items>
      </v-toolbar>

      <v-divider/>
      <v-spacer/>

      <v-card-text>
        <v-spacer/>
        <v-spacer/>
        <VueJsonPretty :data="props.data" :showLineNumber="true" ></VueJsonPretty>
        <v-spacer/>
        <v-spacer/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
