import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Obra } from './obra';
import { ObraService } from './obra.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {

  obras: Obra[] = [];

  constructor(private obraService : ObraService, public authService: AuthService) { }

  ngOnInit(): void {
    this.obraService.getObras().subscribe(
      obras => this.obras = obras
    );
  }

  delete(obra: Obra):void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la obra ${obra.denominacion} ${obra.ciudad}?`,
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

        this.obraService.delete(obra.id).subscribe(
          response => {
            this.obras = this.obras.filter(cli => cli !== obra)
            swal(
              'Obra Eliminada!',
              `Obra ${obra.denominacion} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
