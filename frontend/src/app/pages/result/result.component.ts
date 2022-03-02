import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClusterService } from 'src/app/service/cluster.service';
import { Groups } from 'src/app/model/groups';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  cluster$: Observable<Groups> = this.clusterService.getCluster(1);

  constructor(
    private clusterService: ClusterService,
  ) { }

  clusterKeys: string[] = [];
  clusterValues: number[][] = [];
  clusterentries: any;
  ngOnInit(): void {
    this.cluster$.subscribe(data => {
      this.clusterentries = data;
      console.log(this.clusterentries);
      this.clusterKeys = Object.keys(data);
      this.clusterValues = Object.values(data);
    })
  }
}