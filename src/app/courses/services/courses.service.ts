import { HttpClient } from '@angular/common/http';
import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = '/api/courses';

  constructor(private httpClient: HttpClient) {}

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(6000),
      tap((courses) => console.log(courses))
    );
  }

  save(record: Partial<Course>) {
    console.log(record);
    if (record._id) {
      console.log('update');
      return this.update(record);
    }

    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record);
  }

  private update(record: Partial<Course>) {
    return this.httpClient
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
