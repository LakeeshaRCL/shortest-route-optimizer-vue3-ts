import  {NodeDistance} from "@/helpers/classes/graph/nodeDistance";

export class NodeDistanceRegistry {
  nodeDistances: NodeDistance[];

  constructor() {
    this.nodeDistances = [];
  }


  getNodeDistance(name: string): number{

    let node = this.nodeDistances.find(n => n.nodeName == name);
    return node ? node.distance : 0;
  }

  setNodeDistance(name: string, distance: number): void{
    let node = this.nodeDistances.find(n => n.nodeName == name);
    if(node) node.distance = distance;
  }
}
