import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireStorage } from '@angular/fire/storage'
import { Router } from '@angular/router';
import  Firebase  from 'firebase/app';
import { StorageUrl } from 'src/app/models/storageurl';
import { ImagesurlService } from 'src/app/services/imgesurl/imagesurl.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.less']
})
export class UploadfileComponent implements OnInit {

  user: Firebase.User;
  constructor(
    private storage: AngularFireStorage,
    private router: Router,
    private afAuth: AngularFireAuth,
    private imagesurlservice: ImagesurlService
    ) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user){
        this.user = user;
        if(user.emailVerified==false){
          this.router.navigate(['/emailVerification']);
        }
      }else{
        this.router.navigate(['/login']);
      }
    });
  }
files: File[] = [];

onSelect(event) {
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  this.files.splice(this.files.indexOf(event), 1);
}
upload(){
  this.files.forEach( _file => {
    let id = Math.random().toString(36).substring(2);
    let file = _file;
    let filepath = `upload/${id}${_file.name}`;
    let imagesurl : StorageUrl = {
      url: filepath,
      userId: this.user.uid,
    }
    this.imagesurlservice.createUrl(imagesurl);
    this.storage.ref(filepath);
    this.storage.upload(filepath,file);
  });
  Swal.fire("","Archivos subidos correctamente", "success");
  this.files.length=0;
}
}
