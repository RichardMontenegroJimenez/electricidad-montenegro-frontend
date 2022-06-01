import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Encargado } from '../encargado';
import { EncargadoService } from '../encargado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-encargados',
  templateUrl: './form-encargados.component.html',
  styleUrls: ['./form-encargados.component.css']
})
export class FormEncargadosComponent implements OnInit {
  public encargado: Encargado = new Encargado();
  public titulo:string = "Crear Encargado";
  public errores: string[];

  constructor(private encargadoService: EncargadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEncargado();
  }

  cargarEncargado():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.encargadoService.getEncargado(id).subscribe( (encargado) => this.encargado = encargado )
      }
    })
  }

  public create(): void {
    this.encargadoService.create(this.encargado)
    .subscribe(Encargado => {
      this.router.navigate(['/encargados'])
      swal('Nuevo encargado', `Encargado ${this.encargado.nombre} creado con éxito!`, 'success')
  }, 
  err => {
    this.errores = err.error.errors as string [];
    console.error('Código del error desde el backend' + err.status);
    console.error(err.error.errors);
  }
  );
  }

  update():void{
    this.encargadoService.update(this.encargado)
    .subscribe( encargado => {
      this.router.navigate(['encargados'])
      swal('Encargado actualizado', `Encargado ${this.encargado.nombre} actualizado con éxito!`, 'success')
    }, 
    err => {
      this.errores = err.error.errors as string [];
      console.error('Código del error desde el backend' + err.status);
      console.error(err.error.errors);
    }
    )
  }
}
