import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {fromEvent, interval, noop, Observable, timer} from "rxjs";
import {response} from "express";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const http$ = new Observable(observer => {
      fetch('/api/courses')
        .then(response => {
          return response.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(reason => {
          observer.error(reason);
        });
    });

    http$.subscribe(
      courses => console.log('courses:', courses),
      noop,
      () => console.log('completed')
    )
  }

}
