import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Agents } from 'src/app/models/ui-models/agents.model';
import { AgentsService } from '../agents.service';


@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css'],
  

})
export class ViewAgentComponent implements OnInit {
  mustemId: string | null | undefined;
  agent: Agents = {
    id:'',
    agentid:'',
    firstname:'',
    surname:'',
    date: '',
    begin:'',
    finish:'',
    excuse:'',
    excusehours:0
  };

  selected = 'option2';


  isNewAgent= false;
  header = "";

  

  constructor(private readonly agentsService:AgentsService,
    private readonly route:ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
         this.mustemId = params.get('id');
         //agent id add ise eklemeye göre 
        if(this.mustemId === "add"){
          this.isNewAgent=true;
          this.header="Müşteri Temsilcisi Efor Ekle:";
        }
        //değilse edite göre
        else
        {
          this.isNewAgent=false;
          this.header="Müşteri Temsilcisi efor düzenle:";
        }



         this.agentsService.getAgentT(this.mustemId).subscribe(
          (success)=>{
            this.agent=success;

          },
          (error)=>{

          }
         )
      }
    )
  }

  onUpdate(){
    this.agentsService.updateAgent(this.agent.id,this.agent)
    .subscribe(
      (success)=>{
      this.snackbar.open('efor güncellendi',undefined,{
        duration: 2000
      })
      this.router.navigateByUrl('agent');
      },
      (error)=>{
        this.snackbar.open('efor güncellenemedi',undefined,{
          duration:2000
        })
      }
      )
    
  }

  onDelete()
  {
    this.agentsService.deleteAgent(this.agent.id).subscribe(
      (success)=>{
        this.snackbar.open('başarılı silindi',undefined,{
          duration: 2000
        })
        
      },
      (error)=>{
        this.snackbar.open('Efor silindi',undefined,{
          duration:2000
        })
        setTimeout(()=>{
          this.router.navigateByUrl('agent');
        },2000)

      }
    )
  }

  onAdd(){
      this.agentsService.addAgent(this.agent)
      .subscribe(
    (success)=>{
      this.snackbar.open('efor eklendi',undefined,{
        duration:2000
      })
     setTimeout(()=>{
      this.router.navigateByUrl(`agent/${success.id}`);
     },2000)
    },
    (error)=>{
      this.snackbar.open('efor eklenemedi',undefined,{
        duration:2000
      })

    }
      )
  }


}

