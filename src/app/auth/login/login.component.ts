import { Component, Injectable, OnInit } from '@angular/core';

import { AgentsService } from 'src/app/agent/agents.service';
import { Router } from '@angular/router';
import { User } from '../model/ui-models/user';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // model:any={};
  sicilno:string='';

  agentid : string = '';
  password : string = '';
  role : string = '';

  user : User = new User();

  roles : string[];

  constructor(private authService : AgentsService, private route : Router ) {
    this.roles = [
      'admin',
      'user'
    ]
  }

  ngOnInit(): void {
    this.agentid = '';
    this.password = '';
  }

  login()
  {
    this.user.agentid = this.agentid;
    this.user.password = this.password;
    this.user.role = this.role;
    localStorage.setItem('sicilno', this.agentid);
    console.log(localStorage.getItem('sicilno'));

    this.authService.login(this.user).subscribe(res => {

      if(res == null) {
        alert("Username or password is wrong");
        localStorage.removeItem("sicilno");
        this.ngOnInit();
      }else {
        console.log("Login successful");
        if(this.role == 'user') {
          this.route.navigate(['/agent']);
        }

        if( this.role == 'admin') {
          this.route.navigate(['/admin']);
        }

      }

    }, err => {
      alert("Login failed");
      this.ngOnInit();
    })

  }

  public kazim=this.sicilno;




  /*
  {
    this.user.agentid = this.agentid;
    this.user.password = this.password;
    this.user.role = this.role;

    this.authService.login(this.user).subscribe(res => {

      if(res == null) {
        alert("Uername or password is wrong");
        this.ngOnInit();
      }else {
        console.log("Login successful");
       // localStorage.setItem("token",res.token);

        if(this.role == 'user') {
          this.route.navigate(['/agent']);
        }

        if( this.role == 'admin') {
          this.route.navigate(['/admin']);
        }

      }

    }, err => {
      alert("Login failed");
      this.ngOnInit();
    })

  }*/

}

