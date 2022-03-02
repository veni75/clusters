import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { ClusterService } from 'src/app/service/cluster.service';
import { Cluster } from 'src/app/model/cluster';
import { Groups } from 'src/app/model/groups';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Vectorcluster {
  text: string;
  id: number;
}

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  randomSeed: number = Math.floor(Math.random() * 3) + 10;
  numberOfEmbedding: number = Math.floor(Math.random() * 6) + 5;
  lengthOfEmbedding: number = Math.floor(Math.random() * 3) + 3;
  numberOfVectorcluster: number = Math.floor(Math.random() * 3) + 2;
  threshold: number = 4.5;
  embeddings: number[][] = [];
  vectorclusters: Vectorcluster[] = [];
  startPoints: number[] = [];
  startPoints$: Observable<number[]> = new Observable();
  

  embeddingGenerate(numberOfEmbedding: number, lengthOfEmbedding: number): number[][] {

    this.startPoints$ = this.clusterService.getStart(1);
    this.startPoints$.subscribe(
      data => {
        for (let i = 0; i < numberOfEmbedding; i += 1) {
          let vect: number[] = [];
          for (let j = 0; j < lengthOfEmbedding; j++) {
            vect.push(data[lengthOfEmbedding * i + j]);
          }
          this.embeddings.push(vect);
        }
      }
    )

    return this.embeddings;
  }

  vectorClusterGenerate(numberOfVectorcluster: number): Vectorcluster[] {
    for (let i = 0; i < numberOfVectorcluster; i += 1) {
      this.vectorclusters.push({ text: `group_${i + 1}`, id: i + 1 });
    }
    return this.vectorclusters;
  }

  constructor(
    private clusterService: ClusterService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.embeddingGenerate(this.numberOfEmbedding, this.lengthOfEmbedding);
    this.vectorClusterGenerate(this.numberOfVectorcluster);
  }

  embeddingGenerateButton(): void {
    this.embeddings = [];
    this.startPoints = [];
    this.randomSeed = Math.floor(Math.random() * 3) + 10;
    this.numberOfEmbedding = Math.floor(Math.random() * 6) + 5;
    this.lengthOfEmbedding = Math.floor(Math.random() * 3) + 3;
    this.numberOfVectorcluster = Math.floor(Math.random() * 3) + 2;
    this.embeddingGenerate(this.numberOfEmbedding, this.lengthOfEmbedding);
    this.vectorClusterGenerate(this.numberOfVectorcluster);
  }


  group_1: number[][] = [];

  group_2: number[][] = [];

  group_3: number[][] = [];

  group_4: number[][] = [];

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)
    } else {
      //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    }
  }


  groups: Groups = new Groups();
  cluster: Cluster = new Cluster();

  onUpdate(event: any): void {
    const groupsArea = event.target.parentElement.nextElementSibling.lastChild;


    for (let i = 0; i < groupsArea.childNodes.length; i++) {
      let boxnumberArray: number[] = [];
      let boxArray = groupsArea.childNodes.item(i).querySelectorAll('.example-box');
      for (let j = 0; j < boxArray.length; j++) {

        let numberArray = boxArray.item(j).innerHTML.split(',');
        let numberArray1 = numberArray.map((e: any) => parseFloat(e));

        boxnumberArray[j] = numberArray1;
        console.log(boxnumberArray);
      }

      if (i == 0) {
        this.groups['group_1'] = boxnumberArray;
      }
      if (i == 1) {
        this.groups['group_2'] = boxnumberArray;
      }
      if (i == 2) {
        this.groups['group_3'] = boxnumberArray;
      }
      if (i == 3) {
        this.groups['group_4'] = boxnumberArray;
      }
      this.cluster.clusters = this.groups;
    }
    this.cluster.myId = 1;

    this.clusterService.update(this.cluster).subscribe(
      () => this.openSnackBar('Újraklaszterezés megtörtént','OK','3000'),
    );
  }

  openSnackBar(message: string,action:string,duration:any): void {
    this.snackBar.open(message,action, {
      duration:3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',});
  }
}
