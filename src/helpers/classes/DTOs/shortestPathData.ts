export class ShortestPathData {
    nodeNames: string[];
    distance: number;

    constructor(){
      this.nodeNames = [];
      this.distance = 0;
    }

    addNodeName(nodeName: string):void {
      this.nodeNames.push(nodeName);
    }

    setDistance(distance: number):void {
      this.distance = distance;
    }

    getNodeNames(): string{
      return this.nodeNames.join(", ");
    }

    getDistance(): number {
      return this.distance;
    }
}

