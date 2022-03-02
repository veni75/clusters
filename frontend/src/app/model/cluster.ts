import { Groups } from "./groups";

export class Cluster {
    _id: string = '';
    myId: number = 0;
    startPoints: number[] = [];
    clusters: Groups = new Groups();
}
