import { Component, Input, OnInit, ViewChild } from '@angular/core';
//import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Agents } from '../models/ui-models/agents.model';
import { AgentsService } from './agents.service';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../auth/model/ui-models/user';
import { LoginComponent } from '../auth/login/login.component';



@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
  
})
export class AgentComponent implements OnInit {


  agent:Agents[]=[];

  user!:User;
 // @Input() sicilno:any;
 //t:any;
/*
  user2: User= {
    
    agentid:this.user.agentid,
    firstname:this.user.firstname,
    surname:this.user.surname,
    password:this.user.password,
    token:this.user.token,
    role:this.user.role,
 
  };
  */
 mustemSicil:String='glb9090923';

  
  displayedColumns: string[] = [ 'date', 'begin','finish','excuse','excusehours','edit'];
  dataSource:MatTableDataSource<Agents>=new MatTableDataSource<Agents>();
  dataSource2 : any [] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';
  time = {hour: 13, minute: 30};
  meridian = true;
  toggleMeridian() {
    this.meridian = !this.meridian;
}



  constructor(private agentsService:AgentsService,private readonly route:ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    console.log('user',this.user);
            
           this.agentsService.getSicil(this.mustemSicil).subscribe((res: any) => {

          this.dataSource = res;
   
           console.log('response-> ', res);
   
          });
   
      }
    

      
 
       
     
      
    
    
      
 

/*     

    this.route.paramMap.subscribe(
      (params)=>{
         this.agentidu = params.get('glb9090923');
    this.agentsService.getSicil(this.agentidu)
    .subscribe(
      (success)=>{
        this.agent=success;
        console.log("result: ", success);
        this.dataSource=new MatTableDataSource<Agents>(this.agent);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      (err)=>
      {

      }
    )



    this.user.agentid = this.agentidu;
      
         this.agentsService.getSicil(this.agentidu).subscribe(
          (success)=>{
            this.agent=success;
            this.dataSource=new MatTableDataSource<Agents>(this.agent);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;

          },
          (error)=>{

          }
         )




    this.agentsService.getAgent()
    .subscribe(
      (success)=>{
        this.agent=success;
        this.dataSource=new MatTableDataSource<Agents>(this.agent);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      (err)=>
      {

      }
    )
  
  */
  
  filterAgent()
  {
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }


}
