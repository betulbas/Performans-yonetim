import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { ViewAgentComponent } from './agent/view-agent/view-agent.component';
import { AdminDashboardComponent } from './auth/component/admin-dashboard/admin-dashboard.component';
import{LoginComponent} from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'agent',
    component:AgentComponent
  },
  {
    path:'agent/:id',
    component:ViewAgentComponent
  },
  {
    path:'agent/add',
    component:ViewAgentComponent
  },

  {
    path:'admin',
    component:AdminDashboardComponent
  },

  {
   path:'signup', 
   component:SignupComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
