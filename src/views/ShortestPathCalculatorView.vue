<script setup lang="ts">

import {onMounted, ref, type Ref} from "vue";

import type {NullableShortestPathData, NullableString} from "@/helpers/typeAliases";
import {useGraphStore} from "@/stores/graphStore";
import {Graph} from "@/helpers/classes/graph/graph";

const image    = new URL('../assets/images/group_one.png', import.meta.url).href
const graphStore = useGraphStore();

let shortestPathData: Ref<NullableShortestPathData> = ref(null);
let graphNodeNames: Ref<string[]> = ref(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
let fromNode: Ref<NullableString> = ref(null);
let toNode: Ref<NullableString> = ref(null);



function initGraph(){
  // setting up the graphStore
// add nodes
  graphNodeNames.value.forEach(gnn =>{
    graphStore.addNode(gnn)
  })


// define edges
  graphStore.addEdge("A", "B", 4);
  graphStore.addEdge("B", "A", 4);
  graphStore.addEdge("A", "C", 6);
  graphStore.addEdge("C", "A", 6);
  graphStore.addEdge("C", "D", 8);
  graphStore.addEdge("D", "C", 8);
  graphStore.addEdge("D", "G", 1);
  graphStore.addEdge("G", "D", 1);
  graphStore.addEdge("G", "I", 5);
  graphStore.addEdge("I", "G", 5);
  graphStore.addEdge("I", "E", 8);
  graphStore.addEdge("E", "I", 8);
  graphStore.addEdge("E", "D", 4);
  graphStore.addEdge("D", "E", 4);
  graphStore.addEdge("E", "B", 2);
  graphStore.addEdge("B", "F", 2);
  graphStore.addEdge("F", "B", 2);
  graphStore.addEdge("F", "E", 3);
  graphStore.addEdge("E", "F", 3);
  graphStore.addEdge("F", "G", 4);
  graphStore.addEdge("G", "F", 4);
  graphStore.addEdge("F", "H", 6);
  graphStore.addEdge("H", "F", 6);
  graphStore.addEdge("H", "G", 5);
  graphStore.addEdge("G", "H", 5);
}


function clear(){
  shortestPathData.value = null;
  fromNode.value = null;
  toNode.value = null;
  initGraph()
}

function calculateShortestPath(){
  if(fromNode.value !== null && toNode.value !== null) {
    shortestPathData.value = graphStore.graph.getShortestPath(fromNode.value, toNode.value)
    initGraph()
  }
}


onMounted(()=>{
  initGraph();
})

</script>

<template>

  <div class="background">
    <div class="header">
      <h3>Dijiktra’s Algorithm Calculator </h3>
      <p>Discovering Optimal Routes Through Nodes Using Dijkstra's Method</p>
    </div>

    <v-card class="card" variant="elevated">
      <div>
        <v-row no-gutters class="row">
          <v-col>
            <div class="input-area">
              <h3>Select Path</h3>

              <v-label>From Node</v-label>
              <v-select
                v-model="fromNode"
                placeholder="Select"
                variant="outlined"
                density="compact"
                :items="graphNodeNames"
              />

              <v-label>To Node</v-label>
              <v-select
                v-model="toNode"
                placeholder="Select"
                variant="outlined"
                density="compact"
                :items="graphNodeNames"
              />

              <div class="buttons">
                <v-btn
                  class="btn"
                  variant="outlined"
                  color="#DA753C"
                  @click="clear">
                  Clear
                </v-btn>

                <v-btn
                  class="btn"
                  append-icon="mdi-calculator"
                  color="#DA753C"
                  @click="calculateShortestPath">
                  Calculate
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col :class="shortestPathData ? 'result' : ''">
            <div class="result-area">
              <div class="result" v-if="shortestPathData">
                <h3>Result</h3>

                <div class="result-content">
                  <span>From Node Name = '{{fromNode}}', To Node Name = '{{toNode}}': {{shortestPathData.getNodeNames()}}</span> <br>
                  <br>
                  <span>Total distance {{shortestPathData.distance}}</span>
                </div>
              </div>
              <div v-else class="image-wrapper">
                <v-img
                  class="image"
                  :width="100"
                  :src="image"
                ></v-img>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>



<!--  <v-card>-->

<!--  </v-card>-->
</template>

<style scoped>
  .background{
    width: 100%;
    height: 100vh; /* Adjust height as needed */
    background: linear-gradient(to bottom, #1154A3 40%, #E7F3FF 40%);
    text-align: center;
    align-items: center;
  }

  .header{
    padding-top: 6vh;
    color: white;
  }

  .header > h3{
    font-size: 36pt;
  }

  .header > p {
    font-size:  18pt;
  }

  .card{
    max-width:60vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4%;
  }

  .input-area, .result-area{
    width: calc((60vw )/ 2 - 50px);
    margin: 20px;
    text-align: left;
    height: inherit;
  }

  .input-area{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .input-area > h3, .result > h3 {
    font-size: 18pt;
    color: #1154A3;
    margin-bottom: 2vh;
  }

  .result {
    background: #F2F3F6;
  }

  .result-content{
    background-color: #FFFFFF;
    height: 30vh;
    padding: 2em;
    color: #5A5B5D;
  }

  .image-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .image {
    max-width: 55%;
    height: auto;
    margin-top: 30px;
    margin-bottom: auto;

  }

  .buttons{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .buttons > .btn{
    margin-right: 15px;
  }
</style>

