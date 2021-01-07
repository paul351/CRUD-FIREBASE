import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import Firebase from 'firebase';
import { User } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  loginGoogle(){
    return this.afAuth.signInWithPopup(new Firebase.auth.GoogleAuthProvider);
  }

  getUser(){
    return this.afAuth.user;
  }
  signin(user:User){
    return this.afAuth.signInWithEmailAndPassword(user.username,user.password);
  }

  createUser(user: User){
    return this.afAuth.createUserWithEmailAndPassword(user.username,user.password);
  }

  logout(){
    return this.afAuth.signOut();
  }

}
