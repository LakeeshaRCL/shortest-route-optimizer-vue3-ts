<script setup lang="ts">

import {onMounted, ref, type Ref} from "vue";
import type {NullableShortestPathData, NullableString} from "@/helpers/typeAliases";
import {Graph} from "@/helpers/classes/graph/graph";
import axios from "axios";
import {Node} from "@/helpers/classes/graph/node";

// custom components
import EchoedDataViewerComponent from "@/components/EchoedDataViewerComponent.vue";

const image    = new URL('../assets/images/group_one.png', import.meta.url).href
let graph:Graph = new Graph();
let shortestPathData: Ref<NullableShortestPathData> = ref(null);
let graphNodeNames: Ref<string[]> = ref(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
let fromNode: Ref<NullableString> = ref(null);
let toNode: Ref<NullableString> = ref(null);
let isLoading: Ref<boolean> = ref( false )
let showEchoedData: Ref<boolean> = ref( false )
let echoedResponse: Ref<object | null> = ref(null);


/**
 * A function to initialize the graph
 */
function initGraph(){
  // setting up the graph
  // add nodes
  graphNodeNames.value.forEach(gnn =>{
    graph.addNode(new Node(gnn))
  })


// define edges
  graph.addEdge("A", "B", 4);
  graph.addEdge("B", "A", 4);
  graph.addEdge("A", "C", 6);
  graph.addEdge("C", "A", 6);
  graph.addEdge("C", "D", 8);
  graph.addEdge("D", "C", 8);
  graph.addEdge("D", "G", 1);
  graph.addEdge("G", "D", 1);
  graph.addEdge("G", "I", 5);
  graph.addEdge("I", "G", 5);
  graph.addEdge("I", "E", 8);
  graph.addEdge("E", "I", 8);
  graph.addEdge("E", "D", 4);
  graph.addEdge("D", "E", 4);
  graph.addEdge("E", "B", 2);
  graph.addEdge("B", "F", 2);
  graph.addEdge("F", "B", 2);
  graph.addEdge("F", "E", 3);
  graph.addEdge("E", "F", 3);
  graph.addEdge("F", "G", 4);
  graph.addEdge("G", "F", 4);
  graph.addEdge("F", "H", 6);
  graph.addEdge("H", "F", 6);
  graph.addEdge("H", "G", 5);
  graph.addEdge("G", "H", 5);
}


/**
 * This function can be used to clear the calculated results and input bindings
 */
function clear(){
  shortestPathData.value = null;
  fromNode.value = null;
  toNode.value = null;
}


/**
 * This function can be used to calculate the shortest path data based on selected nodes
 */
function calculateShortestPath(){
  if(fromNode.value !== null && toNode.value !== null) {
    shortestPathData.value = graph.getShortestPath(fromNode.value, toNode.value)
  }
}


/**
 * This function is used to set random nodes to inputs
 */
function setRandomNodes(){
  isLoading.value = true;
  clear();

  getRandomNumbers((numberOne : number, numberTwo: number)=>{
    fromNode.value = graphNodeNames.value[numberOne];
    toNode.value = graphNodeNames.value[numberTwo];
    isLoading.value = false;
  })
}


/**
 * This function can be used to fetch a random number using an API
 * @param callback a callback function that will be called when the data is fetched
 */
function getRandomNumbers(callback:(numberOne:number, numberTwo:number) => void){

  const url = "/api/random?min=0&max=9&count=2";

  axios.get(url)
    .then(resp => {
      console.log("random number : ",resp.data)
      if(Array.isArray(resp.data)){
        callback(resp.data[0], resp.data[1])
      }
      else{
        callback(0, 0)
      }
    })
    .catch(error => {
      console.error("Failed to fetch random number "+error)
      callback(0, 0)
    })
}


/**
 * This function can be used to get the echoed shortest path data from an API
 */
function getShortestPathDataEcho(){

  const url = "/api/echo"

  isLoading.value = true;

  axios.post(url, shortestPathData.value)
    .then(resp=>{
      console.log("echo response: ", resp)
      console.log("echo response type: ", typeof resp.data)
      isLoading.value = false;
      echoedResponse.value = resp.data;
      showEchoedData.value = true;
    })
    .catch(error => {
      console.error("Failed to echo the output "+error)
      isLoading.value = false;
      showEchoedData.value = true;
    })
}


function hideEchoedData(){
  echoedResponse.value = null;
  showEchoedData.value = false;
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

    <v-progress-circular
      class="progress"
      v-if="isLoading"
      :size="90"
      :width="8"
      color="blue-lighten-3"
      indeterminate
    />

    <v-card class="card" variant="elevated" v-else>
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

              <div class="random-selection" @click="setRandomNodes">
                Select nodes randomly!
              </div>
              <br>

              <div class="buttons">
                <v-btn
                  class="btn text-none"
                  variant="outlined"
                  color="#DA753C"
                  @click="clear">
                  Clear
                </v-btn>

                <v-btn
                  class="btn text-none"
                  append-icon="mdi-calculator"
                  color="#DA753C"
                  :disabled="fromNode === null || toNode === null"
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
                  <span>From Node Name = "{{fromNode}}", To Node Name = "{{toNode}}": {{shortestPathData.getNodeNames()}}</span> <br>
                  <br>
                  <span>Total distance: {{shortestPathData.distance}}</span>

                  <div class="echo">
                    <v-btn
                      class="btn text-none"
                      variant="outlined"
                      color="#DA753C"
                      @click="getShortestPathDataEcho">
                      Check echoed result
                    </v-btn>
                  </div>
                  <br>
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

    <echoed-data-viewer-component
      v-if="showEchoedData"
      :data="echoedResponse === null ? {} : echoedResponse"
      @click:outside="hideEchoedData"
      @close="hideEchoedData"
    />

  </div>
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
    color: #3B3C3F;
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

  .random-selection:hover{
    color: #1154A3;
    font-weight: bolder;
  }

  .echo{
    margin-top: 1em;
    text-align: center;
  }

  .progress{
    margin-top: 6em;
  }

</style>

