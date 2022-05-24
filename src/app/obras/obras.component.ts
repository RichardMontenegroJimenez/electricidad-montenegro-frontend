import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Obra } from './obra';
import { ObraService } from './obra.service';


@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {

  obras: Obra[] = [];

  constructor(private obraService : ObraService) { }

  ngOnInit(): void {
    this.obraService.getObras().subscribe(
      obras => this.obras = obras
    );
  }

}
