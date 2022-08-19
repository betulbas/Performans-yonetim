import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
//import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../auth/model/api-models/user';
import { AddUserRequest } from '../auth/model/api-models/addUserRequest.model';
import { AddAgentRequest } from '../models/api-models/addAgentRequest.model';
import { Agents } from '../models/api-models/agents.model';
import { updateAgentRequest } from '../models/api-models/updateAgentRequest.model';


@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private baseApiUrl='http://localhost:8080';
  loginUrl : string = '';
  signUpUrl : string = '';




  constructor(private httpClient:HttpClient) { 
    this.loginUrl = "http://localhost:8080/api/mustem/login";
    this.signUpUrl = "http://localhost:8080/api/mustem/register";
  }
  getAgent(): Observable<Agents[]>{
    return this.httpClient.get<Agents[]>(this.baseApiUrl+"/api/mustem");
  }


  getAgentT(mustemId:string | null): Observable<Agents>{
    return this.httpClient.get<Agents>(this.baseApiUrl+"/api/mustem/"+mustemId);
  }
  getSicil(t: any): Observable<any> {
     const headers = {'content-type': 'application/json'};
   return this.httpClient.get(this.baseApiUrl+"/api/mustem/agentid/"+t); }
 

  updateAgent(mustemId:string,agentRequest:Agents): Observable<Agents>{
    const updateAgentRequest : updateAgentRequest={
      id:agentRequest.id,
      agentid:agentRequest.agentid,
      firstname:agentRequest.firstname,
      surname:agentRequest.surname,
      date:agentRequest.date,
      begin:agentRequest.begin,
      finish:agentRequest.finish,
      excuse:agentRequest.excuse,
      excusehours:agentRequest.excusehours

    }
    return this.httpClient.put<Agents>(this.baseApiUrl+"/api/mustem/update/"+mustemId,updateAgentRequest);

  }


  deleteAgent(mustemId:string):Observable<Agents>{
    return this.httpClient.delete<Agents>(this.baseApiUrl+'/api/mustem/delete/'+mustemId);
  }

  addAgent(agentRequest:Agents): Observable<Agents>{
    const addAgentRequest : AddAgentRequest ={
      agentid: agentRequest.agentid,
      firstname: agentRequest.firstname,
      surname: agentRequest.surname,
      date: agentRequest.date,
      begin: agentRequest.begin,
      finish: agentRequest.finish,
      excuse: agentRequest.excuse,
      excusehours: agentRequest.excusehours
    }
    return this.httpClient.post<Agents>(this.baseApiUrl+'/api/mustem/save/',addAgentRequest);
  }


  login(user : User) : Observable<any> {


    return this.httpClient.post(this.loginUrl,user);


    }


  signUp(user : User) : Observable<any> {
    return this.httpClient.post<any>(this.signUpUrl,user);
  }


}
