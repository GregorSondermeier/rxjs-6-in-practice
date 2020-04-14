import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {fromEvent, interval, noop, Observable, timer} from "rxjs";
import {response} from "express";
import {map} from "rxjs/operators";
import {createHttpObservable} from "../common/util";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$.pipe(
      map(response => Object.values(response['payload'])),
    )

    courses$.subscribe(
      courses => console.log('courses:', courses),
      noop,
      () => console.log('completed')
    )
  }

}

