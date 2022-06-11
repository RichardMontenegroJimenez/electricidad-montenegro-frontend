import { Component, OnInit } from '@angular/core';
import { Obra } from '../obra';
import { ObraService } from '../obra.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Encargado } from 'src/app/encargados/encargado';

@Component({
  selector: 'app-form-obras',
  templateUrl: './form-obras.component.html',
  styleUrls: ['./form-obras.component.css']
})
export class FormObrasComponent implements OnInit {

  public obra: Obra = new Obra();
  encargados: Encargado[];
  public titulo:string = "Crear Obra"

  public errores: string[];

  constructor(private obraService: ObraService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarObra();
    this.obraService.getEncargados().subscribe(encargados => this.encargados = encargados);
  }

  cargarObra():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.obraService.getObra(id).subscribe( (obra) => this.obra = obra )
      }
    })
  }

  public create(): void {
    console.log(this.obra);
    this.obraService.create(this.obra)
    .subscribe(Obra => {
      this.router.navigate(['/obras'])
      swal('Nueva obra', `Obra ${this.obra.denominacion} creada con éxito!`, 'success')
    }, 
    err => {
      this.errores = err.error.errors as string [];
      console.error('Código del error desde el backend' + err.status);
      console.error(err.error.errors);
    }
    );
    
  }

  update():void{
    console.log(this.obra);
    this.obraService.update(this.obra)
    .subscribe( obra => {
      this.router.navigate(['obras'])
      swal('Obra actualizada', `Obra ${this.obra.denominacion} actualizada con éxito!`, 'success')
    }, 
    err => {
      this.errores = err.error.errors as string [];
      console.error('Código del error desde el backend' + err.status);
      console.error(err.error.errors);
    }
    );
  }

  compararEncargado(o1:Encargado, o2:Encargado):boolean {

    if(o1 === undefined && o2 === undefined){
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id === o2.id;
  }
}

