import { Component, OnInit , Inject, Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { User } from "../../models/user.model";
import { UsersService } from "../../services/users.service";
import { AlertService } from '../../services/alert.service';
import { CustomValidators } from '../../core/custom-validators';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="container p-3">
      <div>
        <div class="card">
          <div class="card-header  font-weight-bold">
            Changement de mot de passe
          </div>
          <div class="card card-body">
            <form [formGroup]="frmSignup" (submit)="submit()">
              <div class="hidden">
                <input type="text" formControlName="userId" placeholder="userId" name="userId" class="form-control" id="userId" readonly="true">
              </div>
              <div class="form-group">
                <label for="password" [ngClass]="frmSignup.controls['password'].invalid ? 'text-danger' : ''">Password:</label>
                <input id="password" formControlName="password" type="password" class="form-control" [ngClass]="frmSignup.controls['password'].invalid ? 'is-invalid' : ''">
                <!-- <label class="text-danger col" *ngIf="frmSignup.controls['password'].hasError('required')">
                  Password is Required!
                </label> -->
                <label class="col" [ngClass]="frmSignup.controls['password'].hasError('required') || frmSignup.controls['password'].hasError('minlength')  ? 'text-danger' : 'text-success'">
                  <i class="material-icons">{{ frmSignup.controls['password'].hasError('required') ||
                    frmSignup.controls['password'].hasError('minlength') ? 'cancel' :
                    'check_circle' }}</i>
                  Must be at least 8 characters!
                </label>
                <label class="col" [ngClass]="frmSignup.controls['password'].hasError('required') || frmSignup.controls['password'].hasError('hasNumber')  ? 'text-danger' : 'text-success'">
                  <i class="material-icons">{{ frmSignup.controls['password'].hasError('required') ||
                    frmSignup.controls['password'].hasError('hasNumber') ? 'cancel' :
                    'check_circle' }}</i>
                  Must contain at least 1 number!
                </label>
                <label class="col" [ngClass]="frmSignup.controls['password'].hasError('required') || frmSignup.controls['password'].hasError('hasCapitalCase')  ? 'text-danger' : 'text-success'">
                  <i class="material-icons">{{ frmSignup.controls['password'].hasError('required') ||
                    frmSignup.controls['password'].hasError('hasCapitalCase') ? 'cancel' :
                    'check_circle' }}</i>
                  Must contain at least 1 in Capital Case!
                </label>
                <label class="col" [ngClass]="frmSignup.controls['password'].hasError('required') || frmSignup.controls['password'].hasError('hasSmallCase')  ? 'text-danger' : 'text-success'">
                  <i class="material-icons">{{ frmSignup.controls['password'].hasError('required') ||
                    frmSignup.controls['password'].hasError('hasSmallCase') ? 'cancel' :
                    'check_circle' }}</i>
                  Must contain at least 1 Letter in Small Case!
                </label>
                <label class="col" [ngClass]="frmSignup.controls['password'].hasError('required') || frmSignup.controls['password'].hasError('hasSpecialCharacters') ? 'text-danger' : 'text-success'">
                  <i class="material-icons">{{ frmSignup.controls['password'].hasError('required') ||
                    frmSignup.controls['password'].hasError('hasSpecialCharacters') ? 'cancel' :
                    'check_circle' }}</i>
                  Must contain at least 1 Special Character!
                </label>
              </div>
              <div class="form-group">
                <label for="confirmPassword" [ngClass]="frmSignup.controls['confirmPassword'].invalid ? 'text-danger' : ''">Confirm
                  Password:</label>
                <input id="confirmPassword" formControlName="confirmPassword" type="password" class="form-control"
                  [ngClass]="frmSignup.controls['confirmPassword'].invalid ? 'is-invalid' : ''">
                <label class="text-danger" *ngIf="frmSignup.controls['confirmPassword'].hasError('required')">
                  Password is Required!
                </label>
                <label class="text-danger" *ngIf="frmSignup.controls['confirmPassword'].hasError('NoPassswordMatch')">
                  Password do not match
                </label>
              </div>
              <div class="form-group">
                <button [disabled]="frmSignup.invalid" type="submit" class="btn btn-primary btn-block font-weight-bold">Valider</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./edit-user.component.scss']
})
export class NgbdModalContent {  
  frmSignup: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private usersService: UsersService, private alertService: AlertService) {
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        userId: [
          window.localStorage.getItem("editUserId")
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit() {
    // do signup or something
    this.usersService.changePassword(this.frmSignup.value)
    .subscribe(data => {    
      if(data.status === 200) {              
        this.alertService.success("Le mot de passe a été modifié !");     
        this.activeModal.close();
      }
    },
    error =>{
      this.alertService.error(error || error.message);
    });
  }
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  //user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private usersService: UsersService, 
              private alertService: AlertService, private modalService: NgbModal) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      // alert("Invalid action.")
      this.alertService.error("Invalid action.");
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [''], 
      email: ['', Validators.email],
      username: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(12)])],      
      bio: ['', Validators.required],
      birthday: ['', Validators.required]
    });

    this.usersService.getUserById(userId)
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
    this.usersService.updateUser(this.editForm.value)
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

  open() {    
    const modalRef = this.modalService.open(NgbdModalContent, { size: 'lg' });
    //modalRef.componentInstance.userId = this.user._id;
  }

}