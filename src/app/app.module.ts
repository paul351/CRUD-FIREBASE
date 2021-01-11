import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { UploadfileComponent } from './pages/uploadfile/uploadfile.component';
import { ShowfilesComponent } from './pages/showfiles/showfiles.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LSelect2Module } from 'ngx-select2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { LoginComponent } from './pages/login/login.component';
import { NgFallimgModule } from 'ng-fallimg';
import { EmailverificationComponent } from './pages/emailverification/emailverification.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    UploadfileComponent,
    ShowfilesComponent,
    LoginComponent,
    EmailverificationComponent,
  ],
  imports: [
    BrowserModule,
    NgFallimgModule.forRoot({
      default: "../assets/user.png"}),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    LSelect2Module,
    NgxDatatableModule,
    NgxMaskModule.forRoot(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
