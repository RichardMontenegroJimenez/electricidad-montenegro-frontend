import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../empleados/empleado';
import { EmpleadoService } from '../empleados/empleado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit {
  public empleado: Empleado = new Empleado();
  public titulo:string = "Crear Empleado"

  constructor(private empleadoService: EmpleadoService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.empleadoService.create(this.empleado).subscribe(Empleado => {
      swal('Nuevo empleado', `Empleado ${this.empleado.nombre} creado con éxito!`, 'success')
  });

  }
}
