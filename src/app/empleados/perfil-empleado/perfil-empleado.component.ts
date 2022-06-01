import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {

  empleado: Empleado;
  titulo: string = "Perfil del empleado";
  private fotoSeleccionada: File;

  constructor(private empleadoService: EmpleadoService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{

      let id:number = +params.get('id');
      if(id){
        this.empleadoService.getEmpleado(id).subscribe(empleado =>{
          this.empleado = empleado;
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
      this.empleadoService.subirFoto(this.fotoSeleccionada, this.empleado.id)
      .subscribe(empleado => {
        this.empleado = empleado;
        swal('La foto se ha subido correctamente', `La foto se ha subido con éxito: ${this.empleado.foto}`, 'success');
      });
    }
  }

}
