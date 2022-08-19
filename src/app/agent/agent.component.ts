import * as XLSX from 'xlsx';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Agents } from '../models/ui-models/agents.model';
import { AgentsService } from './agents.service';
import { LoginComponent } from '../auth/login/login.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../auth/model/ui-models/user';

//import * as XLSX from 'xlsx';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
  
})
export class AgentComponent implements OnInit {

  agent:Agents[]=[];

  user!:User;


 mustemSicil = localStorage.getItem('sicilno');

  
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
    this.mustemSicil = localStorage.getItem('sicilno');
    this.agentsService.getSicil(this.mustemSicil).subscribe((res: any) => {
      this.dataSource = res;
      console.log('response-> ', res);
    });
  }
    
  
  filterAgent()
  {
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
  logout() {
    localStorage.removeItem("sicilno");
    this.router.navigate(['/']);
  }


}
