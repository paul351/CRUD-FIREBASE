import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  Firebase  from 'firebase/app';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.less']
})
export class EmailverificationComponent implements OnInit {
  user: Firebase.User;
  out:boolean=false;
  constructor(
    private afAuth: AngularFireAuth,
    private loginservice: LoginService
  ) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user){
        this.out = true;
        this.user = user;
      }
    })
  }

  resend(){
    this.loginservice.sendemail();
  }

}
