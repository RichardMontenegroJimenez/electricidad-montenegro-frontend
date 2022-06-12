import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  
  constructor(private empresaService: EmpresaService, public authService: AuthService) { }

  ngOnInit(): void {
    this.empresaService.getEmpresas().subscribe(
      empresas => this.empresas = empresas
    );
  }

  delete(empresa: Empresa):void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la empresa ${empresa.nombre}?`,
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

        this.empresaService.delete(empresa.id).subscribe(
          response => {
            this.empresas = this.empresas.filter(cli => cli !== empresa)
            swal(
              'Empresa Eliminada!',
              `Empresa ${empresa.nombre} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
