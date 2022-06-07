import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import swal from 'sweetalert2';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];
  empleadoSeleccionado: Empleado;

  constructor(private empleadoService : EmpleadoService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
    //Actualizar foto
    this.modalService.notificarUpload.subscribe(empleado => {
      this.empleadoSeleccionado.foto = empleado.foto;
    })


  }

  delete(empleado: Empleado):void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al empleado ${empleado.nombre} ${empleado.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.empleadoService.delete(empleado.id).subscribe(
          response => {
            this.empleados = this.empleados.filter(cli => cli !== empleado)
            swal(
              'Empleado eliminado!',
              `Empleado ${empleado.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }
  abrirModal(empleado: Empleado){
    this.empleadoSeleccionado = empleado;
    this.modalService.abrirModal();
  }
}
