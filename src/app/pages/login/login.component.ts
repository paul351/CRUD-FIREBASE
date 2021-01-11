import { Component, OnInit, NgZone, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private ngZone: NgZone,
    private loginService: LoginService,
    private modalService: BsModalService
    ) { }

  loginForm = this.formbuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  recoverForm = this.formbuilder.group({
    email: ['',Validators.required]
  });
  ngOnInit(): void {

    this.loginService.getUser().subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        })
      }
    })

  }

  onGoogle(){
    this.loginService.loginGoogle().then(() =>{
      this.router.navigate(['/home']);
    }).catch(response =>{
      this.errorMessage = response.message;
      console.error(response);
    });
  }
  onFacebook(){
    this.loginService.loginFacebook().then(() => {
      this.router.navigate(['/home']);
    }).catch(response => {
      this.errorMessage = response.message;
      console.error(response);
    })
  }

  createUser() {
    this.loginService.createUser(this.loginForm.value).then(() => {
      this.router.navigate(['/emailVerification']);
    }).catch(response => {
      this.errorMessage = response.message;
    });
  }

  signIn() {
    this.loginService.signin(this.loginForm.value).then(() => {
      this.router.navigate(['/home']);
    }).catch(response => {
      this.errorMessage = response.message;
    });
  }

  resetPassword(recovertemplate: TemplateRef<any>){
    this.modalRef = this.modalService.show(recovertemplate);
  }

  sendRecover(){
    this.loginService.recoverAccount(this.recoverForm.value.email).then(() => alert("Se ha enviado un correo a su cuenta, por favor siga los pasos.")).catch(error => this.errorMessage=error);
    this.recoverForm.reset();
        this.modalRef.hide();
  }
}
