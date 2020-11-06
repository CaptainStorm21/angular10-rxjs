//create a angular injectable 
//

import { Injectable} from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import { Course } from '../model/course';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  //create angular HTTP client in order to 
  //access the backend 
  constructor (private http: HttpClient) {

  }

//building reactive service
  loadAllCourses(): Observable<Courses[]>
  /*observable course array is observable that returns 
  the view layer is going to emit the values overtime
  it will emit only one value if our http called to our 
  result from the backedn is successful value will be
  a list of available courses in the home component

  home component on the other hand will receive
  the data from the courses without knowing where the data
  is coming from 
  */
  {
    //we will be returning a new observable 
    // that is where going to be deriving from our 
    // HTTP get observable 

    //return this.http.get<Course[]>("/api/courses");
    //we are returning http request in pure response 
    //without modifying it

    //emitting the value that we need by using rxjs map 
    //operator.
    //RXJS operators are changable functions that 
    //allow us to quickly combine different observables 
    //in order to obtain different types of results
    return this.http.get<Course[]>("/api/courses")
      .pipe(
        map(
          res => res["payload"]
          );
    //payload is taken from the top of the data sources object
  }
}

/*
Course[] the data returns is only accessable by home and anywhere in the applciation
without being modified by subscriving through the returned observable Observerable<Course[]>
*/

/*
map function passes each cource value 
through and entire array
1 2 3
map(x => 10 * x)
10 20 30

without modifying the original values
*/