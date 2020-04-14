import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {concat, fromEvent, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from "../common/util";


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  courseId: string;

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;


  @ViewChild('searchInput', {static: true}) input: ElementRef;

  constructor(private route: ActivatedRoute) {


  }

  ngOnInit() {

    this.courseId = this.route.snapshot.params['id'];
    this.course$ = this.loadCourse();
  }

  ngAfterViewInit() {
    const initialLessons$ = this.loadLessons();

    const searchedLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => this.loadLessons(query))
      )

    this.lessons$ = concat(initialLessons$, searchedLessons$);
  }

  loadCourse() {
    return createHttpObservable(`/api/courses/${this.courseId}`) as Observable<Course>;
  }

  loadLessons(query: string = ''): Observable<Lesson[]> {
    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${query}`)
      .pipe(
        map(response => response['payload'])
      );
  }


}
