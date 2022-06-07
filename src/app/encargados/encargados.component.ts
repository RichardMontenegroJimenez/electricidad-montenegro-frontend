import { Component, OnInit } from '@angular/core';
import { Encargado } from './encargado';
import { EncargadoService } from './encargado.service';
import swal from 'sweetalert2';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrls: ['./encargados.component.css']
})
export class EncargadosComponent implements OnInit {

  encargados: Encargado[] = [];
  encargadoSeleccionado: Encargado;

  constructor(private encargadoService : EncargadoService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.encargadoService.getEncargados().subscribe(
      encargados => this.encargados = encargados
    );

    //Actualizar foto
    this.modalService.notificarUpload.subscribe(encargado => {
      this.encargadoSeleccionado.foto = encargado.foto;
    })

  }

  delete(encargado: Encargado):void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al encargado ${encargado.nombre} ${encargado.apellido}?`,
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

        this.encargadoService.delete(encargado.id).subscribe(
          response => {
            this.encargados = this.encargados.filter(cli => cli !== encargado)
            swal(
              'Encargado eliminado!',
              `Encargado ${encargado.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(encargado: Encargado){
    this.encargadoSeleccionado = encargado;
    this.modalService.abrirModal();
  }
}
