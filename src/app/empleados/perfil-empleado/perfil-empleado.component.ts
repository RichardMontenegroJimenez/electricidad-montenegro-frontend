import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {

  @Input() empleado: Empleado;
  titulo: string = "Perfil del empleado";
  private fotoSeleccionada: File;
  progreso:number = 0;

  constructor(private empleadoService: EmpleadoService, 
    public modalService: ModalService) { }

  ngOnInit(): void {

  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal('Error seleccionar imagen: ', 'El archivo debe ser una imagen', 'error');
      this.fotoSeleccionada=null;
    }

  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      swal('Error Upload: ', 'debe selecconar una foto', 'error');
    } else {
      this.empleadoService.subirFoto(this.fotoSeleccionada, this.empleado.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        } else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.empleado = response.empleado as Empleado;
          //emitter para actualizar la foto en la vista
          this.modalService.notificarUpload.emit(this.empleado);
          swal('La foto se ha subido correctamente', `La foto se ha subido con éxito: ${this.empleado.foto}`, 'success');
        }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
