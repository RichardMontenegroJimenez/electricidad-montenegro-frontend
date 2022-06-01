import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit {
  public empleado: Empleado = new Empleado();
  public titulo:string = "Crear Empleado";
  public errores: string[];

  constructor(private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cargarEmpleado():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.empleadoService.getEmpleado(id).subscribe( (empleado) => this.empleado = empleado )
      }
    })
  }

  public create(): void {
    this.empleadoService.create(this.empleado).subscribe(Empleado => {
      this.router.navigate(['/empleados'])
      swal('Nuevo empleado', `Empleado ${this.empleado.nombre} creado con éxito!`, 'success')
  }, 
  err => {
    this.errores = err.error.errors as string [];
    console.error('Código del error desde el backend' + err.status);
    console.error(err.error.errors);
  }
  );
  }

  update():void{
    this.empleadoService.update(this.empleado)
    .subscribe( empleado => {
      this.router.navigate(['empleados'])
      swal('Empleado actualizado', `Empleado ${this.empleado.nombre} actualizado con éxito!`, 'success')
    }, 
    err => {
      this.errores = err.error.errors as string [];
      console.error('Código del error desde el backend' + err.status);
      console.error(err.error.errors);
    }
    );
  }

}
