import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cluster } from '../model/cluster';
import { HttpClient } from '@angular/common/http';
import { Groups } from '../model/groups';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  
  serverUrl: string = 'http://localhost:3000/clusters';
  
  constructor(
    public http: HttpClient,
  ) {
    
   }

  getAll():Observable<Cluster[]>{    
    return this.http.get<Cluster[]>(this.serverUrl);
  }
    
  get(myId:number):Observable<Cluster>{    
    return this.http.get<Cluster>(`${this.serverUrl}/${myId}`);
  }

  getStart(myId:number):Observable<number[]>{    
    return this.http.get<number[]>(`${this.serverUrl}/${myId}/start`);
  }

  getCluster(myId:number):Observable<Groups>{    
    return this.http.get<Groups>(`${this.serverUrl}/${myId}/cluster`);
  }

  create(cluster:Cluster): Observable<Cluster> {
    return this.http.post<Cluster>(this.serverUrl, cluster);
  }

  update(cluster:Cluster): Observable<Cluster> {
    return this.http.patch<Cluster>(`${this.serverUrl}/${cluster.myId}`, cluster);
  }

  remove(cluster:Cluster): Observable<Cluster> {
    return this.http.delete<Cluster>(`${this.serverUrl}/${cluster._id}`);
  }
}