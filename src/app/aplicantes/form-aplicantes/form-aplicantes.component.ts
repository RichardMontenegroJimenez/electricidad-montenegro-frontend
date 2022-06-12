import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aplicante } from '../aplicante';
import { AplicanteService } from '../aplicante.service';

@Component({
  selector: 'app-form-aplicantes',
  templateUrl: './form-aplicantes.component.html',
  styleUrls: ['./form-aplicantes.component.css']
})
export class FormAplicantesComponent implements OnInit {

  public aplicante: Aplicante = new Aplicante();

  public titulo:string = "Formulario para solicitud de empleo"

  public errores: string[];


  constructor(private aplicanteService: AplicanteService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log(this.aplicante);
    this.aplicanteService.create(this.aplicante)
    .subscribe(Aplicante => {
      this.router.navigate(['/aplicantes'])
      swal('Formulario enviado', `Formulario para ${this.aplicante.nombre} enviado con éxito!`, 'success')
    }, 
    err => {
      this.errores = err.error.errors as string [];
      console.error('Código del error desde el backend' + err.status);
      console.error(err.error.errors);
    }
    );
    
  }

}
