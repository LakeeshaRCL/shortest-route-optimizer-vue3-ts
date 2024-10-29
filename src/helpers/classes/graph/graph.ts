import {Node} from "@/helpers/classes/graph/node";
import {ShortestPathData} from "@/helpers/classes/DTOs/shortestPathData";
import type {NullableShortestPathData} from "@/helpers/typeAliases";
import {NodeDistance} from "@/helpers/classes/graph/nodeDistance";
import {NodeDistanceRegistry} from "@/helpers/classes/graph/nodeDistanceRegistry";

export class Graph{
  nodes: Node[];

  constructor(){
    this.nodes = [];
  }

  /**
   * This function can be used to add a new no to the graph
   * @param node new node
   */
  addNode(node: Node): void{
    this.nodes.push(node);
  }


  /**
   * This function can be used to get a node from the graph by its name
   * @param name node name
   */
  getNode(name: string): Node | null{
    return this.nodes.find(n => n.name === name) ?? null;
  }

  /**
   * This function can be used to add a edge to node to another
   * @param from start node name
   * @param to end node name
   * @param weight wight of the edge
   */
  addEdge(from: string, to: string, weight: number): void {
    let fromNode = this.getNode(from);
    let toNode = this.getNode(to);

    if (fromNode && toNode) fromNode.addEdge(toNode, weight);
  }


  /**
   * This function can be used to clear the graph
   */
  clear(){
    this.nodes = [];
  }



  /**
   * This function can be used to get the
   * @param from start node name
   * @param to end node name
   */
  getShortestPath(from: string, to: string) : NullableShortestPathData{
    // TODO: implement  this
    let fromNode = this.getNode(from);
    let toNode = this.getNode(to);

    let shortestPthData: NullableShortestPathData = new ShortestPathData();

    console.log("function called")
    console.log("from node", fromNode)
    console.log("to node", toNode )

    if(fromNode && toNode) {
      let visitedNodes: Node[] = [];
      let unvisitedNodes: Node[] = [...this.nodes];

      let nodeDistanceRegistry : NodeDistanceRegistry = new NodeDistanceRegistry();
      let previousNodes: Map<string, Node|null> = new Map(); // map to track the previous nodes

      // initialize node distances
      this.nodes.forEach(node =>{
        nodeDistanceRegistry.nodeDistances.push(new NodeDistance(node.name, node === fromNode ? 0 : Infinity))
        previousNodes.set(node.name, null);
      });

      // console.log("Initial Node distances registry: ", nodeDistanceRegistry)
      // console.log("unvisited nodes: ", unvisitedNodes)
      console.log(" ")


      // looping through unvisited nodes
      while (unvisitedNodes.length > 0){

        // Sort unvisited nodes by distance
        unvisitedNodes.sort((a, b) => nodeDistanceRegistry.getNodeDistance(a.name) - nodeDistanceRegistry.getNodeDistance(b.name));

        // unvisited node
        let visitingNode = unvisitedNodes[0];


        // go through the edges and calculate the distances
        visitingNode.edges.forEach(edge =>{

          // check adjacent node is in the visited list
          if(visitedNodes.find(n => n.name == edge.to.name) == undefined){

            // console.log(`current visiting node : ${visitingNode.name} - adjacent unvisited node : ${edge.to.name}`)

            // calculate distance and update
            let newDistance = nodeDistanceRegistry.getNodeDistance(visitingNode.name) + edge.weight;

            // only update if the distance is lower than the current distance
            if(newDistance < nodeDistanceRegistry.getNodeDistance(edge.to.name)){
              nodeDistanceRegistry.setNodeDistance(edge.to.name, newDistance)
              previousNodes.set(edge.to.name, visitingNode); // track the previous node
            }

          }
        })

        // update node arrays
        visitedNodes.push(visitingNode);
        unvisitedNodes.splice(0, 1);

        // console.log("unvisited nodes: ", unvisitedNodes)
        // console.log("visited nodes: ", visitedNodes)
        // console.log("distance registry updated : ", nodeDistanceRegistry)
        //
        // console.log(" ")
        // console.log(" ")

      }

      // get the path
      let currentNode : null| Node = toNode; // start from the end node and then backtrack

      // generate path sequence
      while (currentNode) {
        shortestPthData.nodeNames.unshift(currentNode.name); // add node to the front
        currentNode = previousNodes.get(currentNode.name) ?? null; // get the next node
      }

      // set total distance between the nodes
      shortestPthData.distance =  nodeDistanceRegistry.getNodeDistance(to);
    }
    else{
      shortestPthData = null;
    }

    return shortestPthData;
  }
}
