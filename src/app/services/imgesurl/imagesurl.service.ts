import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StorageUrl } from 'src/app/models/storageurl';

@Injectable({
  providedIn: 'root'
})
export class ImagesurlService {

  collectionName: string = "storageUrl";

  constructor(private fireStore: AngularFirestore) { }

  createUrl(storageUrl: StorageUrl){
    return this.fireStore.collection(this.collectionName).add(storageUrl);
  }

  getUrls(userId: string){
    return this.fireStore.collection(this.collectionName,ref => ref.where("userId","==",userId)).snapshotChanges();
  }
}
