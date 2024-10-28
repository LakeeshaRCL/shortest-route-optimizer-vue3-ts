import { defineStore } from 'pinia'
import {Graph} from "@/helpers/classes/graph/graph";
import {Node} from "@/helpers/classes/graph/node";
import type {NullableShortestPathData} from "@/helpers/typeAliases";

export const useGraphStore = defineStore('graphStore', {
  // not using anymore
  state: () => {

    return {
      graph: new Graph(),

    }
  },

  actions : {
    addNode(nodeName:string): void{
      this.graph.addNode(new Node(nodeName))
    },

    addEdge(from: string, to: string, weight: number): void{
      this.graph.addEdge(from, to, weight);
    }
  },

})
