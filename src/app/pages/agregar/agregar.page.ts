import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from 'src/app/models/lista-item-model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {  

  lista!: Lista;
  list: Lista | undefined;

  nombreItem = '';

  constructor( private deseosService: DeseosService,
                private router: ActivatedRoute
  ) { 
    const listaId = Number(this.router.snapshot.paramMap.get('listaId'));

    this.list = this.deseosService.obtenerLista( listaId || 0 );

    if(this.list !== undefined){     
      this.lista = this.list ;  
    }

  }

  ngOnInit() {
  }

  agregarItem() {

    if( this.nombreItem.length === 0 ){
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = ' ';
    this.deseosService.guardarStorage();

  }

  cambioCheck( item: ListaItem) {
    const pendientes = this.lista.items.filter( itemData => !itemData.completado ).length;

    if( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();

    console.log(this.lista, 'verify');
  }

  borrar(i: number ) {
    this.lista.items.splice(i,1);
    this.deseosService.guardarStorage();
  }

}
