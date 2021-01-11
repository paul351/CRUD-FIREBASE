import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ImagesurlService } from 'src/app/services/imgesurl/imagesurl.service';
import  Firebase  from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Data, Router } from '@angular/router';
import { StorageUrl } from 'src/app/models/storageurl';

@Component({
  selector: 'app-showfiles',
  templateUrl: './showfiles.component.html',
  styleUrls: ['./showfiles.component.less']
})
export class ShowfilesComponent implements OnInit {
  profileUrl: Observable<Array<string>|null>;
  user: Firebase.User;
  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private imageUrlService: ImagesurlService,
    private router: Router
    ) {
  }
  listUrls: Array<any> = []
  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user){
        if(user.emailVerified==false){
          this.router.navigate(['/emailVerification']);
        }
        this.user = user;
        this.imageUrlService.getUrls(user.uid).subscribe(res => {
          this.listUrls = res.map((call:any) =>{
            return { url : call.payload.doc.data().url}
          });
        });
        const ref = this.storage.ref("");
        this.profileUrl = ref.getDownloadURL();
      }else{
        this.router.navigate(['/login']);
      }
    });


  }

}
