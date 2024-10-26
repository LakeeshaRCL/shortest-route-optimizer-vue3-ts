<script setup lang="ts">

import {onMounted, ref, type Ref} from "vue";
import {Graph} from "@/helpers/classes/graph/graph";
import {Node} from "@/helpers/classes/graph/node";
import type {NullableShortestPathData} from "@/helpers/typeAliases";

let graph: Graph = new Graph();
let shortestPathData: Ref<NullableShortestPathData> = ref(null);

// setting up the graph
// add nodes
graph.addNode(new Node("A"));
graph.addNode(new Node("B"));
graph.addNode(new Node("C"));
graph.addNode(new Node("D"));
graph.addNode(new Node("E"));
graph.addNode(new Node("F"));
graph.addNode(new Node("G"));
graph.addNode(new Node("H"));
graph.addNode(new Node("I"));


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


// tODO :: remove bidirectional and add connections to each
onMounted(()=>{
  let result = graph.getShortestPath("B", "D");
  shortestPathData.value = result;
  console.warn(result)
})

</script>

<template>
  <v-card>
    <div v-if="shortestPathData">
      <span>Node sequence = {{shortestPathData.getNodeNames()}}</span> <br>
      <span>Total distance {{shortestPathData.distance}}</span>
    </div>
  </v-card>
</template>

<style scoped>

</style>
