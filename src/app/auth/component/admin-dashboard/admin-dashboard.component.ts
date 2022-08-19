import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Agents } from 'src/app/models/ui-models/agents.model';
import { AgentsService } from 'src/app/agent/agents.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  agent:Agents[]=[];
  displayedColumns: string[] = ['agentid','firstname', 'surname', 'date', 'begin','finish','excuse','excusehours'];
  dataSource:MatTableDataSource<Agents>=new MatTableDataSource<Agents>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';
  time = {hour: 13, minute: 30};
  meridian = true;
  toggleMeridian() {
    this.meridian = !this.meridian;
}
  constructor(private agentsService:AgentsService,private route : Router ) { }

  ngOnInit(): void {
    debugger;
    this.agentsService.getAgent().subscribe(
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
  }

  filterAgent()
  {
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
  logout() {
    localStorage.removeItem("token");
    this.route.navigate(['/']);
  }

  exportExcel()
{
  let element=document.getElementById("excel-table");
  const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
  const wb:XLSX.WorkBook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,'Sayfa1');

  let title="eforlar.xlsx";
  XLSX.writeFile(wb,title);

}

}
