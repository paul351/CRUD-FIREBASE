import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ShowfilesComponent } from './pages/showfiles/showfiles.component';
import { UploadfileComponent } from './pages/uploadfile/uploadfile.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'uploadfile', component: UploadfileComponent},
  {path: 'showfiles', component: ShowfilesComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
