import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'flatpickr/dist/flatpickr.css';
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
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { trash,pencilFill } from 'ngx-bootstrap-icons';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const icons = {
  trash, pencilFill
}

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
    CalendarComponent,
    PruebaComponent,
  ],
  imports: [
    BrowserModule,
    NgFallimgModule.forRoot({
      default: "../assets/user.png"}),
    NgxBootstrapIconsModule.pick(icons),
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxPaginationModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    NgxDropzoneModule,
    LSelect2Module,
    BsDatepickerModule.forRoot(),
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
