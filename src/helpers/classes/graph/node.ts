import {Edge} from "@/helpers/classes/graph/edge";

export class Node{
  name:string;
  edges: Edge[];

  constructor(name:string ) {
    this.name = name
    this.edges = [];
  }


  /**
   * This function can be used to add an edge to the node
   * @param to destination node
   * @param weight weight of the edge
   */
  addEdge(to:Node, weight: number):void {
    this.edges.push(new Edge(weight,to));
  }
}
