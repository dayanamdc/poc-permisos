import { Injectable, Injector } from "@angular/core";
import { EntityCollectionDataService, QueryParams } from "@ngrx/data";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@environment";
import { LoggerService } from "../logger.service";

@Injectable()
export class HttpClientDataService<T>
  implements EntityCollectionDataService<T>
{
  name: string;
  entities: T[] = [];
  entityIdentifier = "id";
  protected logger!: LoggerService;
  protected storage!: HttpClient;

  constructor(injector: Injector) {
    this.logger = injector.get(LoggerService);
    this.storage = injector.get(HttpClient);
  }

  add(entity: T): Observable<T> {
    this.entities = [...(this.entities || []), entity];
    return this.addInStorage(entity);
  }

  delete(id: string | number): Observable<string | number> {
    this.entities = this.entities.filter(
      (e) => e[this.entityIdentifier] !== id,
    );
    return this.deleteFromStorage(id) as unknown as Observable<string | number>;
  }

  getAll(): Observable<T[]> {
    return this.storage
      .get(environment.apiUrl + "/" + this.name)
      .pipe(
        tap((entities: T[]) => {
          this.entities = [...(entities || [])];
          return [...(entities || [])];
        }),
      )
      .pipe(
        tap((response) => {
          this.logger.debug(
            "httpClient get " +
              this.name +
              " with response: " +
              JSON.stringify(response),
          );
        }),
      ) as Observable<T[]>;
  }

  getById(id: string | number): Observable<T> {
    return this.storage
      .get<T>(environment.apiUrl + "/" + this.name, {
        params: new HttpParams().append(this.entityIdentifier, id.toString()),
      })
      .pipe(
        tap((response) => {
          this.logger.debug(
            "httpClient get " +
              this.name +
              "/" +
              id +
              " with response: " +
              JSON.stringify(response),
          );
        }),
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
      .get(environment.apiUrl + "/" + this.name, {
        params: queryParams,
      })
      .pipe(
        tap((entities: T[]) => {
          this.entities = [...entities];
          this.logger.debug(
            "httpClient get " +
              this.name +
              " with params: " +
              JSON.stringify(queryParams) +
              " and response: " +
              JSON.stringify(entities),
          );
          return [...entities];
        }),
      ) as Observable<T[]>;
  }

  update(update: import("@ngrx/entity").Update<T>): Observable<T> {
    let updatedEntity = null;
    this.entities = this.entities.map((e) => {
      if (e[this.entityIdentifier] === update.id) {
        updatedEntity = {
          ...e,
          ...update.changes,
        };
        return updatedEntity;
      }
      return e;
    });
    if (updatedEntity) {
      return this.updateInStorage(updatedEntity);
    }
    return this.updateInStorage(update.changes as T);
  }

  upsert(entity: T): Observable<T> {
    let updatedEntity = null;
    this.entities = this.entities.map((e) => {
      if (e[this.entityIdentifier] === entity[this.entityIdentifier]) {
        updatedEntity = {
          ...e,
          ...entity,
        };
        return updatedEntity;
      }
      return e;
    });
    if (!updatedEntity) {
      this.entities = [...this.entities, entity];
      return this.patchInStorage(entity);
    }
    return this.patchInStorage(updatedEntity);
  }

  protected deleteFromStorage(id: string | number): Observable<T> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append(this.entityIdentifier, id.toString());

    return this.storage
      .delete(environment.apiUrl + "/" + this.name, {
        params: queryParams,
      })
      .pipe(
        tap((response) => {
          this.logger.debug(
            "httpClient delete " +
              this.name +
              " with params: " +
              JSON.stringify(queryParams) +
              " and response: " +
              JSON.stringify(response),
          );
        }),
        map((entity) => {
          if (entity && entity[this.entityIdentifier]) {
            return entity[this.entityIdentifier];
          }
          return !entity ? null : entity.toString();
        }),
      );
  }

  protected addInStorage(entity: T): Observable<T> {
    return this.storage
      .post<T>(environment.apiUrl + "/" + this.name, entity)
      .pipe(
        tap((response) => {
          this.logger.debug(
            "httpClient add " +
              JSON.stringify(entity) +
              " with response: " +
              JSON.stringify(response),
          );
        }),
      );
  }

  protected updateInStorage(entity: T): Observable<T> {
    return this.storage
      .put<T>(environment.apiUrl + "/" + this.name, entity)
      .pipe(
        tap((response) => {
          this.logger.debug(
            "httpClient update " +
              JSON.stringify(entity) +
              " with response: " +
              JSON.stringify(response),
          );
        }),
      );
  }

  protected patchInStorage(entity: T): Observable<T> {
    return this.storage
      .patch<T>(environment.apiUrl + "/" + this.name, entity)
      .pipe(
        tap((response) => {
          this.logger.debug(
            "httpClient patch " +
              JSON.stringify(entity) +
              " with response: " +
              JSON.stringify(response),
          );
        }),
      );
  }
}
