import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
// import '../constaint/constraints';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  api_key="QuUSfNByP1vjGkm92Z4pzdae5VpGPosC";
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getGif(filter){
    let options = { params: new HttpParams({fromString: `api_key=${this.api_key}&q=${filter.query}&limit=${filter.limit}`}) };
    return this.http.get(`https://api.giphy.com/v1/gifs/trending`,options).pipe(retry(3),catchError(this.handleError));
  }
}
