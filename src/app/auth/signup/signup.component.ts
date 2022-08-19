import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentsService } from 'src/app/agent/agents.service';
import { User } from '../model/ui-models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  firstname : string = '';
  surname: string='';
  agentid : string = '';
  password : string = '';

  user : User = new User();

  constructor(
    private authService : AgentsService, 
    private route : Router
  ) { }

  ngOnInit():void {
    this.agentid = '';
    this.password = '';
    this.firstname = '';
    this.surname='';
  }

  signup() {

    this.user.agentid = this.agentid;
    this.user.password = this.password;
    this.user.firstname = this.firstname;
    this.user.surname=this.surname;
    this.user.role = 'user';

    this.authService.signUp(this.user).subscribe(res => {
      if(res == null) {
        alert("Registration failed");
        this.ngOnInit();
      }else {
        console.log("Registration successful");
        alert("Registration successful");
        this.route.navigate(['/']);
      }
    }, err => {
      alert("Registration failed.");
      this.ngOnInit();
    })

  }

}
