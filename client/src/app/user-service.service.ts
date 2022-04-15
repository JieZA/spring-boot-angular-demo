import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { User } from './user';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

  public findOne(id: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + "/" + id)
          .pipe(catchError(this.errorHandler));
  }

  public deleteOne(id: number) {
    return this.http.delete<User>(this.usersUrl + "/" + id)
          .pipe(catchError(this.errorHandler));;
  }

  public errorHandler(error: HttpErrorResponse) {
    return throwError(error);
}
}
