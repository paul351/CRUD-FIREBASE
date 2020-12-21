import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { isNullOrUndefined } from 'util';
import {FirebaseServiceService} from '../../services/firebase-service.service';
import  Swal from 'sweetalert'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {config : any;
  collection = {count : 0, data:[]};
  modalRef: BsModalRef;
  estudianteForm: FormGroup;
  arrayGrados: Array<any> = [];
  action: String;
  btnEdit: boolean;
  btnSave: boolean;
  idFirebase: String;
  toast3: any;
  configBackdrop = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private modalService: BsModalService,
    public formbuilder: FormBuilder,
    private firebaseService: FirebaseServiceService) {}

  ngOnInit(): void {
    this.idFirebase = "";
    this.estudianteForm = this.formbuilder.group({
      cod: [``,Validators.required],
      nombre: [``,Validators.required],
      apellidos: [``,Validators.required],
      grado: [``,Validators.required]
    });
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

    this.firebaseService.getAlumno().subscribe(res => {
    this.collection.data = res.map((call:any) => {
      return{
        cod: call.payload.doc.data().cod,
        nombre: call.payload.doc.data().nombre,
        apellidos: call.payload.doc.data().apellidos,
        grado: call.payload.doc.data().grado,
        id: call.payload.doc.id
      }
    });
    },error => {
      console.error(error);

    });
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
        Swal("","Alumno creado correctamente", "success");
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
  delete(id: any){
    Swal({
      title: "Estas seguro?",
      text: "Estas seguro que quieres eliminar este registro?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        this.firebaseService.deleteAlumno(id);
        Swal("Eliminado!", "El registro fue eliminado!", "success");
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
    });
    this.idFirebase = item.id;
    this.modalRef = this.modalService.show(template,this.configBackdrop);
  }

  updateAlumno(){
    if(!isNullOrUndefined(this.idFirebase)){
      this.firebaseService.updateAlumno(this.idFirebase,this.estudianteForm.value).then(res => {

      }).catch(error =>{
        console.error(error);
      });
      this.estudianteForm.reset();
      this.modalRef.hide();
    }
  }
}