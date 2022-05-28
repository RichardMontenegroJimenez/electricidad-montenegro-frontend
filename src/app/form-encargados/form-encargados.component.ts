import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Encargado } from '../encargados/encargado';
import { EncargadoService } from '../encargados/encargado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-encargados',
  templateUrl: './form-encargados.component.html',
  styleUrls: ['./form-encargados.component.css']
})
export class FormEncargadosComponent implements OnInit {
  public encargado: Encargado = new Encargado();
  public titulo:string = "Crear Encargado"

  constructor(private encargadoService: EncargadoService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.encargadoService.create(this.encargado)
    .subscribe(Encargado => {
      swal('Nuevo encargado', `Encargado ${this.encargado.nombre} creado con éxito!`, 'success')
  });
  }

}
