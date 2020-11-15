import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, OnDestroy {
  public intervalSubs:Subscription

  constructor() { }
  
  ngOnInit(): void {
    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   err => console.warn('Error:', err),
    //   () => console.info('Terminado')
    // );
    //this.intervalSubs = this.retornaIntervalo().subscribe(console.log);

  }

  ngOnDestroy(): void {
    //this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    return interval(500).pipe(
      map(valor => valor + 1),
      filter(valor => (valor % 2 == 0) ? true: false), // segun el filter pasa al take
      //take(10), //contar cuanta veces se ejecuta

    );
  }

  retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if(i === 2){
          i = 0;
          observer.error('llego al valor de 2');
        }
      }, 1000)
    });

  }
}
