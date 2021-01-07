import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import  Firebase  from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
    ) {}

  user:Firebase.User;

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user){
        this.user = user;
      } else{
        this.user = null;
        this.ngZone.run(() => {
          this.router.navigate(['']);
        })
      }
    });
  }
}