import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

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
    private activatedRoute: ActivatedRoute) { }

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
          swal('La foto se ha subido correctamente', `La foto se ha subido con éxito: ${this.empleado.foto}`, 'success');
        }
      });
    }
  }

}
