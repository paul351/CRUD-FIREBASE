import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private fireStore: AngularFirestore) { }
  collectionName: string = "eventos";

  createEventos(objEvent: any){
    return this.fireStore.collection(this.collectionName).add(objEvent);
  }
  getEventos(){
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }
  updateEventos( objEvent:any, id:string){
    return this.fireStore.collection(this.collectionName).doc(id).update(objEvent);
  }
  deleteEventos(id:string){
    return this.fireStore.collection(this.collectionName).doc(id).delete();
  }
}
