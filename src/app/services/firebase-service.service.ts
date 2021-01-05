import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private fireStore: AngularFirestore) { }

  getAlumno(){
    return this.fireStore.collection("alumnos").snapshotChanges();
  }
  getGrado(){
    return this.fireStore.collection("grados").snapshotChanges()
  }
  createAlumno(alumno:Alumno){
    return this.fireStore.collection("alumnos").add(alumno);
  }
  updateAlumno(id:any, alumno:Alumno){
    return this.fireStore.collection("alumnos").doc(id).update(alumno);
  }
  deleteAlumno(id:any){
    return this.fireStore.collection("alumnos").doc(id).delete();
  }
}
