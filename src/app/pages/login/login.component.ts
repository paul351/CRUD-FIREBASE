import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  errorMessage = '';

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private ngZone: NgZone,
    private loginService: LoginService
    ) { }

  loginForm = this.formbuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
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

  createUser() {
    this.loginService.createUser(this.loginForm.value).then(() => {
      this.router.navigate(['/home']);
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

}
