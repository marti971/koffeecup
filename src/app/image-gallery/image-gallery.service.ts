import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Image } from './models/images.interface';

@Injectable()
export class ImageGalleryService {
  private IMAGES_API = 'https://jsonplaceholder.typicode.com/albums/1/photos';

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getImages(): Observable<Image[]> {
    return this.http
      .get<Image[]>(this.IMAGES_API)
      .pipe(catchError(this.handleError));
  }
}
