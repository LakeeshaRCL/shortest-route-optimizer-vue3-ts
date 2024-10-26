import  {Node} from "@/helpers/classes/graph/node";

export class Edge{
  weight: number;
  to: Node;

  constructor(wight: number, to: Node) {
    this.weight =wight;
    this.to = to;
  }
}
