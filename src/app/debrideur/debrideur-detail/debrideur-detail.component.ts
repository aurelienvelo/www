import { Component, OnInit, Input } from '@angular/core';
import { DownloaderService } from '../../services/downloader.service';
import { AlertService } from 'src/app/services/alert.service';
import { FileDownload } from 'src/app/models/filedownload.model';

@Component({
  selector: 'app-debrideur-detail',
  templateUrl: './debrideur-detail.component.html',
  styleUrls: ['./debrideur-detail.component.scss']
})
export class DebrideurDetailComponent implements OnInit {

  @Input() link : any;
  // isShow = true;
  
  constructor(private downloaderService: DownloaderService, private alertService: AlertService) { }

  ngOnInit() {
  }

  // toggleDisplay() {
  //   this.isShow = !this.isShow;
  // }

  onUpload(link) {
    this.downloaderService.downloadFile(link.filename, link)
    .subscribe(data => {
      this.alertService.success("Téléchargement démarré.");
    });
  }
}
