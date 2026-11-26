import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environment';
import { QueryParams } from '@ngrx/data';
import { HttpClientDataService } from './http-client-data.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class HttpClientSingleDataService<T> extends HttpClientDataService<T> {

  constructor(injector: Injector) {
    super(injector);
  }

  getAll(): Observable<T[]> {
    return this.storage.get(environment.apiUrl + '/' + this.name).pipe(
      map((entity: T) => {
        this.entities = [{ ...entity }];
        return this.entities;
      })
    );
  }

  getWithQuery(params: QueryParams): Observable<T[]> {
    let queryParams = new HttpParams();
    for (const param in params) {
      if (param) {
        queryParams = queryParams.append(param, params[param].toString());
      }
    }
    return this.storage
      .get(environment.apiUrl + '/' + this.name, {
        params: queryParams,
      })
      .pipe(
        map((entity: T) => {
          this.entities = [{ ...entity }];
          this.logger.debug(
            'httpClient get ' +
              this.name +
              ' with params: ' +
              JSON.stringify(queryParams) +
              ' and response: ' +
              JSON.stringify(this.entities)
          );
          return this.entities;
        })
      ) as Observable<T[]>;
  }

}
