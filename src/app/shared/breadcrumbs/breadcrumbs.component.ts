import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(event => {
      //console.log(event)
      this.titulo = event.titulo;
      document.title = `AdminPro | ${this.titulo}`
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
  }

}
