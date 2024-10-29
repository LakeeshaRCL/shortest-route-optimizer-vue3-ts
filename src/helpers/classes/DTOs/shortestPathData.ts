export class ShortestPathData {
    nodeNames: string[];
    distance: number;

    constructor(){
      this.nodeNames = [];
      this.distance = 0;
    }


    getNodeNames(): string{
      return this.nodeNames.join(", ");
    }

}

