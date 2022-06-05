import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encargado } from '../encargado';
import { EncargadoService } from '../encargado.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'perfil-encargado',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() encargado: Encargado;
  titulo: string = "Perfil del encargado";
  private fotoSeleccionada: File;
  progreso:number = 0;

  constructor(private encargadoService: EncargadoService, 
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
      this.encargadoService.subirFoto(this.fotoSeleccionada, this.encargado.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        } else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.encargado = response.encargado as Encargado;
          swal('La foto se ha subido correctamente', `La foto se ha subido con éxito: ${this.encargado.foto}`, 'success');
        }
      });
    }
  }

}