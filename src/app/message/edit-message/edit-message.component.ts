import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { first } from 'rxjs/operators';
import { debug } from 'util';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss']
})
export class EditMessageComponent implements OnInit {

  editForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private alertService: AlertService, private messageService: MessagesService) { }

  ngOnInit() {
    let messageId = window.localStorage.getItem("editMessageId");
    if(!messageId) {
      // alert("Invalid action.")
      this.alertService.error("Invalid action.");
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [''], 
      title: ['', Validators.required],
      content: ['', Validators.minLength(5)],      
      attachment: [''],
      link: [''],
      dateModified: [Date.now()]
    });
    
    this.messageService.getMessage(messageId)
      .subscribe(data => {            
        if(data.status === 200) {              
          this.editForm.setValue(data.result);
        }
      },
      error =>{
        this.alertService.error(error);
      } );
  }

  onSubmit() {
    this.messageService.updateMessage(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            // alert('User updated successfully.');
            // this.router.navigate(['admin/list-user']);
            this.alertService.success('Mise à jour réussie.');
          }else {
            // alert(data.message);
            this.alertService.error(data.message);
          }
        },
        error => {
          // alert(error);
          this.alertService.error(error || error.message);
        });
  }
}
