import { Component, OnInit } from '@angular/core';
import { Obra } from '../obras/obra';
import { ObraService } from '../obras/obra.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-obras',
  templateUrl: './form-obras.component.html',
  styleUrls: ['./form-obras.component.css']
})
export class FormObrasComponent implements OnInit {

  public obra: Obra = new Obra();
  public titulo:string = "Crear Obra"

  constructor(private obraService: ObraService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.obraService.create(this.obra)
    .subscribe(Obra => {
      swal('Nueva obra', `Obra ${this.obra.denominacion} creada con éxito!`, 'success')
    });
    
  }
  
}

