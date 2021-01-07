import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import  Firebase  from 'firebase';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  collectionName: string = "alumnos";
  constructor(private fireStore: AngularFirestore) { }

  getAlumnos(uid:string):Observable<Firebase.firestore.QuerySnapshot>{
    return this.fireStore.collection<Alumno>(this.collectionName,ref => ref.where("uid", "==", uid)).get();
  }
  getAlumno() {
    return this.fireStore.collection<Alumno>(this.collectionName).snapshotChanges();
  }
  getGrado(){
    return this.fireStore.collection("grados").snapshotChanges();
  }
  createAlumno(alumno:Alumno){
    return this.fireStore.collection(this.collectionName).add(alumno);
  }
  updateAlumno(id:any, alumno:Alumno){
    return this.fireStore.collection(this.collectionName).doc(id).update(alumno);
  }
  deleteAlumno(id:any){
    return this.fireStore.collection(this.collectionName).doc(id).delete();
  }
}
