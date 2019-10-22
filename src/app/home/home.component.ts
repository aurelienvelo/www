import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public fb: FormBuilder) { }
  
  ngOnInit() {
  }

}
