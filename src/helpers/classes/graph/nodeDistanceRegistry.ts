import  {NodeDistance} from "@/helpers/classes/graph/nodeDistance";

export class NodeDistanceRegistry {
  nodeDistances: NodeDistance[];

  constructor() {
    this.nodeDistances = [];
  }


  /**
   * This can be used to get a node distance in the registry
   * @param name name of the node
   */
  getNodeDistance(name: string): number{

    let node = this.nodeDistances.find(n => n.nodeName == name);
    return node ? node.distance : 0;
  }


  /**
   * This can be used to set a distance of a node in the registry
   * @param name name of the node
   * @param distance new distance
   */
  setNodeDistance(name: string, distance: number): void{
    let node = this.nodeDistances.find(n => n.nodeName == name);
    if(node) node.distance = distance;
  }
}
