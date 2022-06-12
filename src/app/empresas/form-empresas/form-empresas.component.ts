import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Empresa } from '../empresa';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-form-empresas',
  templateUrl: './form-empresas.component.html',
  styleUrls: ['./form-empresas.component.css']
})
export class FormEmpresasComponent implements OnInit {

  public empresa: Empresa = new Empresa();

  public titulo:string = "Formulario para empresas"

  public errores: string[];


  constructor(private empresaService: EmpresaService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log(this.empresa);
    this.empresaService.create(this.empresa)
    .subscribe(Empresa => {
      this.router.navigate(['/empresas'])
      swal('Formulario enviado', `Formulario para ${this.empresa.nombre} enviado con éxito!`, 'success')
    }, 
    err => {
      this.errores = err.error.errors as string [];
      console.error('Código del error desde el backend' + err.status);
      console.error(err.error.errors);
    }
    );
    
  }
}
