import { FormControl } from '@angular/forms';
import { Item } from './../../models/interface';
import { Component } from '@angular/core';
import { catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Livro } from 'src/app/models/interface';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 700;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})

export class ListaLivrosComponent {

  campoBusca = new FormControl()
  livro: Livro
  mensagemErro: string

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
  .pipe(
    debounceTime(PAUSA),
    filter(valorDigitado => valorDigitado.length > 3),
    tap(() => console.log("Fluxo inicial")),
    switchMap(valorDigitado => this.service.buscar(valorDigitado)),
    tap(() => console.log("Requisição ao servidor")),
    map(items => this.listaResultadoParaLivros(items)),
    catchError(erro => {
      return throwError(() => new Error(this.mensagemErro = "Ops, ocorreu um erro"));
    })
    )

    listaResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
      return items.map(item => {
        return new LivroVolumeInfo(item);
      })
    }
  }



