import { Component, OnInit } from '@angular/core';
import { Encargado } from './encargado';
import { EncargadoService } from './encargado.service';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrls: ['./encargados.component.css']
})
export class EncargadosComponent implements OnInit {

  encargados: Encargado[] = [];

  constructor(private encargadoService : EncargadoService) { }

  ngOnInit(): void {
    this.encargadoService.getEncargados().subscribe(
      encargados => this.encargados = encargados
    );
  }
}
