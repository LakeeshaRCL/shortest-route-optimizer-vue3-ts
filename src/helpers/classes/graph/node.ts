import {Edge} from "@/helpers/classes/graph/edge";

export class Node{
  name:string;
  edges: Edge[];

  constructor(name:string ) {
    this.name = name
    this.edges = [];
  }


  addEdge(to:Node, weight: number):void {
    this.edges.push(new Edge(weight,to));
  }
}
