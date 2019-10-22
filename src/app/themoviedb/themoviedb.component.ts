import { Component, OnInit, Input } from '@angular/core';
import { ThemoviedbService } from '../services/themoviedb.service';
import { Link } from '../models/alldebrid.model';
import { DownloaderService } from '../services/downloader.service';
import { AlertService } from '../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DebrideurService } from '../services/debrideur.service';

// export interface MediaType {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-themoviedb',
  templateUrl: './themoviedb.component.html',
  styleUrls: ['./themoviedb.component.scss']
})
export class ThemoviedbComponent implements OnInit {

  @Input() link: Link;

  tmdbForm: FormGroup;
  submitted = false;

  query: string;      
  maxPage : number;
  results: any;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private themoviedb: ThemoviedbService) { }

  ngOnInit() { 
    this.tmdbForm = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required]
    });      
  }

  // convenience getter for easy access to form fields
  get f() { return this.tmdbForm.controls; }

  onSearch() {
    if (this.f.type.value == "movie") {
      this.themoviedb.SearchMovie(this.f.title.value)
      .subscribe(data => {
        this.maxPage = data.total_pages;
        this.results = data.results;
        console.log(data);
      });
    } else if (this.f.type.value == "tv") {
      this.themoviedb.SearchTv(this.f.title.value)
      .subscribe(data => {
        this.maxPage = data.total_pages;
        this.results = data.results;
        console.log(data);
      });
    } else {
      this.themoviedb.multiSearch(this.f.title.value)
      .subscribe(data => {
        this.maxPage = data.total_pages;
        this.results = data.results;
        console.log(data);
      });
    }
  }

  open(result) {
    const modalRef = this.modalService.open(NgbdModalTitle);
    modalRef.componentInstance.resultAlldebrid = result;
    if (this.link) { 
      modalRef.componentInstance.link = this.link;
    } 
    modalRef.componentInstance.mediaType = this.f.type.value;
  }    

}


@Component({
  selector: 'ngbd-modal-title',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{resultAlldebrid.title || resultAlldebrid.name || resultAlldebrid.original_name }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p *ngIf="link">Nom de fichier d'origince: {{link.filename}}</p>
      
      <div *ngIf="!link" class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Lien</span>
        </div>
        <input [(ngModel)]="lien" #ctrl="ngModel" type="text" (blur)="GetLink(lien, '')" placeholder="Votre lien de téléchargement" class="form-control">
      </div>

      <div *ngIf="resultAlldebrid.original_name" class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Saison</span>
        </div>
        <input [(ngModel)]="saison" #ctrl="ngModel" type="text" value="{{saison}}" class="form-control">
      </div>
      
      <div *ngIf="resultAlldebrid.original_name" class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Episode</span>
        </div>
        <input [(ngModel)]="episode" #ctrl="ngModel" type="text" class="form-control">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Nom du fichier</span>
        </div>
        <input [(ngModel)]="outFilename" #ctrl="ngModel" type="text" class="form-control">
      </div>

      <pre>{{outFilename}}</pre>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-primary" (click)="onUpload(outFilename)">Envoyer</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fermer</button>
    </div>
  `
})
export class NgbdModalTitle implements OnInit {  
  @Input() link;
  @Input() resultAlldebrid;  
  @Input() mediaType: string;   
  lien: string;   
  saison: string;
  episode: string;
  _outFilename: string;
  get outFilename() {
    if (this.link) {
      this._outFilename = this.getFileName();
    } 
    return this._outFilename;
  }

  set outFilename(value) {
    this._outFilename = value;
  }

  constructor(public activeModal: NgbActiveModal, private downloaderService: DownloaderService, private alertService: AlertService, private debrideur: DebrideurService) {}

  ngOnInit(): void {
    this.outFilename = this.resultAlldebrid.title || this.resultAlldebrid.name || this.resultAlldebrid.original_name;
  }

  onUpload(filename: string) {
    this.downloaderService.downloadFile(filename, this.link)
    .subscribe(data => {
      this.alertService.success("Téléchargement démarré.");
    });
    this.activeModal.close('Save click');
  }

  GetLink(link, password: string) {
    debugger
    let payload = {
      link: link,
      password: password
    }
    this.debrideur.DownloadLink(payload)   
      .subscribe(
        data => {
          if(data.status === 200) {      
            // console.log(data.result.infos)
            this.link = data.result.infos;            
          }else {
            this.alertService.error(data.message);
          }
        },
        error => {
          this.alertService.error(error || error.message);
          //alert(error);
        });
  }

  getFileName() {    
    let filename: string;
    if (this.resultAlldebrid.title) {
      filename = this.resultAlldebrid.title
      if (this.resultAlldebrid.release_date) {
        filename = filename + ' (' + this.resultAlldebrid.release_date.split('-').shift() + ')';        
      }  
      filename = filename + '.' + this.link.filename.split('.').pop();
    } else if (this.resultAlldebrid.name || this.resultAlldebrid.original_name ) {
      filename = this.resultAlldebrid.name || this.resultAlldebrid.original_name;  
      if (this.saison) {
        filename = filename + " S" + this.saison;
      }  
      if (this.episode) {
        filename = filename + " E" + this.episode;
      }    
      filename = filename + '.' + this.link.filename.split('.').pop();
    } else {
      filename = this.link.filename;
    }    
    return filename;
  }
}