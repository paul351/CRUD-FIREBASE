import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

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
  createAlumno(alumno:any){
    return this.fireStore.collection("alumnos").add(alumno);
  }
  updateAlumno(id:any, alumno:any){
    return this.fireStore.collection("alumnos").doc(id).update(alumno);
  }
  deleteAlumno(id:any){
    return this.fireStore.collection("alumnos").doc(id).delete();
  }
}
