import {Component, OnInit} from '@angular/core';
import {concat, interval, Observable, of} from "rxjs";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const source1$: Observable<number> = interval(1000);
    const source2$: Observable<number> = of(4, 5, 6);
    const source3$: Observable<number> = of(7, 8, 9);

    const result$ = concat(source1$, source2$, source3$);

    result$.subscribe(val => console.log('val:', val));
  }

}

