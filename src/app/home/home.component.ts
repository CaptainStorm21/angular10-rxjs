import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
//import service
import { CoursesService} from '../services/courses.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // beginnerCourses: Course[];
  // advancedCourses: Course[];

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;



  constructor(
    // private http: HttpClient, 
    private coursesService:CoursesService,
    private dialog: MatDialog) {
    /* 
    http client so the call to get  HTTPClient returning here an observable and 
    observable is going to obserser its behavior over time by subscribing to the observable 
    observable might emit multiple values over time 
    observable might not emot any value at all during its lifecycle
    */

  }

  ngOnInit() {

    //observable variable ends with  $ sign
    const courses$ = this.coursesService.loadAllCourses();
    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => courses.category == "BEGINNER"))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => courses.category == "ADVANCED"))
      );
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }

}




