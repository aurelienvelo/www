import { Component, Directive, OnInit } from '@angular/core';
import { DebrideurService } from '../services/debrideur.service';
import { Link } from '../models/alldebrid.model';
import { AlertService } from '../services/alert.service';
import { DebrideurDetailComponent } from './debrideur-detail/debrideur-detail.component';

@Component({
  selector: 'app-debrideur',
  templateUrl: './debrideur.component.html',
  styleUrls: ['./debrideur.component.scss']
})
export class DebrideurComponent implements OnInit {
  lien: Link;
  
  constructor(private debrideur: DebrideurService, private alertService: AlertService) { }

  ngOnInit() {    
  }

  GetLink(link, password: string) {
    let payload = {
      link: link,
      password: password
    }
    this.debrideur.DownloadLink(payload)   
      .subscribe(
        data => {
          if(data.status === 200) {      
            // console.log(data.result.infos)
            this.lien = data.result.infos;            
          }else {
            this.alertService.error(data.message);
          }
        },
        error => {
          this.alertService.error(error || error.message);
          //alert(error);
        });
  }


}
