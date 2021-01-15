import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FirebaseServiceService} from '../../services/firebase-service.service';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import  Swal from 'sweetalert2';
import  Firebase  from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  selectedDate

  config : any;
  collection = {count : 0, data:[]};
  ColumnMode = ColumnMode;
  SortType = SortType;
  modalRef: BsModalRef;
  estudianteForm: FormGroup;
  arrayGrados: Array<any> = [];
  action: String;
  btnEdit: boolean;
  btnSave: boolean;
  idFirebase: String;
  configBackdrop = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private afAuth: AngularFireAuth,
    private modalService: BsModalService,
    public formbuilder: FormBuilder,
    private firebaseService: FirebaseServiceService,
    private router: Router,
    ) {}

  user: Firebase.User

  ngOnInit(): void {
    let useruid = "";
    this.afAuth.user.subscribe(user => {
      if (user){
        this.user = user;
        useruid = user.uid;
        this.estudianteForm = this.formbuilder.group({
          cod: [``,Validators.required],
          nombre: [``,Validators.required],
          apellidos: [``,Validators.required],
          grado: [``,Validators.required],
          uid: useruid
        });

        this.firebaseService.getAlumnos(useruid).subscribe(res => {
          this.collection.data = res.map((call:any) => {
            return { cod: call.payload.doc.data().cod,
                  nombre: call.payload.doc.data().nombre,
                  apellidos: call.payload.doc.data().apellidos,
                  grado: call.payload.doc.data().grado,
                  id: call.payload.doc.id
                }
          });
          },error => {
            console.error(error);
          });
        console.log("UserUID Auth: \n"+user.uid);

        if(user.emailVerified==false){
          this.router.navigate(['/emailVerification']);
        }
      }else{
        this.router.navigate(['/login']);
      }
    })


    this.idFirebase = "";

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    this.firebaseService.getGrado().subscribe(res =>{
      this.arrayGrados = res.map((call:any) => {
        return{
          grado: call.payload.doc.data().grado
        }
      });
    });

    this.btnEdit = false;
    this.btnSave = false;

  }

  get cod(){
    return this.estudianteForm.get('cod');
  }
  get nombre(){
    return this.estudianteForm.get('nombre');
  }
  get apellidos(){
    return this.estudianteForm.get('apellidos');
  }
  get grado(){
    return this.estudianteForm.get('grado');
  }

  pageChange(event){
    this.config.currentPage = event;
  }

  openModal(template: TemplateRef<any>) {
    this.action = "Crear nuevo "
    this.btnSave = true;
    this.btnEdit = false;
    this.modalRef = this.modalService.show(template,this.configBackdrop);
  }

  success(){
      this.firebaseService.createAlumno(this.estudianteForm.value).then(res => {
        Swal.fire("","Alumno creado correctamente", "success");
        this.estudianteForm.reset();
        this.modalRef.hide();
      }).catch(error => {
        console.error(error);
      });
  }
  cancel(){
    this.estudianteForm.reset();
    this.modalRef.hide();
  }

  delete(id: String){
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Ya no podrá recuperar el registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.firebaseService.deleteAlumno(id);
        Swal.fire(
          'Eliminado',
          'El registro fue eliminado satisfactoriamente',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Registro no eliminado',
          'error'
        )
      }
    });
  }

  edit(template: TemplateRef<any>, item:any){
    this.action = "Actualizar ";
    this.btnEdit = true;
    this.btnSave = false;
    this.estudianteForm.setValue({
      cod: item.cod,
      nombre: item.nombre,
      apellidos: item.apellidos,
      grado: item.grado,
      uid: this.user.uid
    });
    this.idFirebase = item.id;
    this.modalRef = this.modalService.show(template,this.configBackdrop);
  }

  updateAlumno(){
    if( this.idFirebase != null || this.idFirebase != undefined){
      Swal.fire(
        'Editado',
        'El registro fue editado satisfactoriamente',
        'success'
      )
      this.firebaseService.updateAlumno(this.idFirebase,this.estudianteForm.value).then(() => {
      }).catch(error =>{
        console.error(error);
      });
      this.estudianteForm.reset();
      this.modalRef.hide();
    }
  }
}