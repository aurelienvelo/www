import { Component, OnInit } from '@angular/core';
import { DownloaderService } from '../services/downloader.service';
import { FileDownload } from '../models/filedownload.model';
import { HttpParams } from '@angular/common/http';
import { interval } from 'rxjs';

const secondsCounter = interval(1000);

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.scss']
})
export class DownloaderComponent implements OnInit {
  filesDownload: FileDownload[];
  params: HttpParams = new HttpParams();
  currentPage: Number;
  maxPage: Number;

  constructor(private downloaderService: DownloaderService) { }

  ngOnInit() {
    this.params = this.params.append('fields', '*')
    this.params = this.params.append('limit', '10');
    this.params = this.params.append('offset', '0');
    this.params = this.params.append('order', '-dateCreated');
    this.currentPage = 0;
    secondsCounter.subscribe( (value) => {
        this.getFiles();
      }
    );
  }

  getFiles() {
    this.downloaderService.getFiles(this.params)
    .subscribe( data => {
      this.maxPage = parseInt(data.message);
      this.filesDownload = data.result;
    });
  }

  removefile(file) {
    this.downloaderService.deleteFile(file._id)
    .subscribe(data => {
      this.getFiles();
    })
  }

}
