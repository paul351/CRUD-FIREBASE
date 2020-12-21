import { Component, OnInit } from '@angular/core';
import {AngularFireStorage } from '@angular/fire/storage'
import  Swal from 'sweetalert'

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.less']
})
export class UploadfileComponent implements OnInit {

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }
files: File[] = [];

onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
upload(){
  console.log(this.files.length);

  this.files.forEach( e => {
    console.log("entra alforich"+e);
    let id = Math.random().toString(36).substring(2);
    let file = e;
    let filepath = `upload/${id}${e.name}`;
    this.storage.ref(filepath);
    this.storage.upload(filepath,file);
  });
  Swal("","Archivos subidos correctamente", "success");
  this.files.length=0;
}
}
