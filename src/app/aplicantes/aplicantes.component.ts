import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Aplicante } from './aplicante';
import { AplicanteService } from './aplicante.service';

@Component({
  selector: 'app-aplicantes',
  templateUrl: './aplicantes.component.html',
  styleUrls: ['./aplicantes.component.css']
})
export class AplicantesComponent implements OnInit {

  aplicantes: Aplicante[] = [];

  constructor(private aplicanteService: AplicanteService, public authService: AuthService) { }

  ngOnInit(): void {
    this.aplicanteService.getAplicantes().subscribe(
      aplicantes => this.aplicantes = aplicantes
    );
  }

  delete(aplicante: Aplicante):void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el aplicante ${aplicante.nombre}?`,
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

        this.aplicanteService.delete(aplicante.id).subscribe(
          response => {
            this.aplicantes = this.aplicantes.filter(cli => cli !== aplicante)
            swal(
              'Aplicante Eliminado!',
              `Aplicante ${aplicante.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }
}
