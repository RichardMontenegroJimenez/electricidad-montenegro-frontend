import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encargado } from '../encargado';
import { EncargadoService } from '../encargado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'perfil-encargado',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  encargado: Encargado;
  titulo: string = "Perfil del encargado";
  private fotoSeleccionada: File;

  constructor(private encargadoService: EncargadoService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{

      let id:number = +params.get('id');
      if(id){
        this.encargadoService.getEncargado(id).subscribe(encargado =>{
          this.encargado = encargado;
        });
      }
    });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
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
      .subscribe(encargado => {
        this.encargado = encargado;
        swal('La foto se ha subido correctamente', `La foto se ha subido con éxito: ${this.encargado.foto}`, 'success');
      });
    }
  }

}
