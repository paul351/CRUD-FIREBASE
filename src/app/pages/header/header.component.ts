import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/services/login/login.service';
import  Firebase  from 'firebase/app';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input()
  user: Firebase.User;

  out:boolean=false;
  constructor(
    private loginService: LoginService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user){
        this.out = true;
        this.user = user;
      }
    })
  }

  collapsed = true;
    toggleCollapsed(): void {
      this.collapsed = !this.collapsed;
  }

  logout() {
    console.log("logout");
    this.loginService.logout();
    this.out = false;
  }
}
