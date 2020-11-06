import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses: Course[];

  advancedCourses: Course[];


  constructor(
    private http: HttpClient, 
    private dialog: MatDialog) {
    /* 
    http client so the call to get  HTTPClient returning here an observable and 
    observable is going to obserser its behavior over time by subscribing to the observable 
    observable might emit multiple values over time 
    observable might not emot any value at all during its lifecycle
    */

  }

  ngOnInit() {

    this.http.get('/api/courses')
      .subscribe(
        /*
          once we get the reply from the backend we are looping through the courses 
          and we will filter the courses based on the categoroy we are asking to receive
        */
        res => {

          const courses: Course[] = res["payload"].sort(sortCoursesBySeqNo);
          /*
            we are creating two arrays for begining and advanced courss 
            then we are going to bring them to the HTML inside of the *ngFOr directives
          */

          this.beginnerCourses = courses.filter(course => course.category == "BEGINNER");

          this.advancedCourses = courses.filter(course => course.category == "ADVANCED");

        });

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




