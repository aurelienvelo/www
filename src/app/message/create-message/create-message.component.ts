import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  editForm: FormGroup;
  //@Output() newMessaged = new EventEmitter<Message>();
  constructor(private formBuilder: FormBuilder, private messagesService: MessagesService, private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      _id: [''], 
      title: ['', Validators.required],
      content: ['', Validators.minLength(5)],      
      attachment: [''],
      link: [''],
      dateModified: [Date.now()]
    });
  }

  onSubmit() {
    this.messagesService.createMessage(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 201) {
            //this.newMessaged.emit(data.result);
            this.alertService.success('Ajout réussie.');
          }else {
            this.alertService.error(data.message);
          }
        },
        error => {
          this.alertService.error(error || error.message);
        });
  }

}
