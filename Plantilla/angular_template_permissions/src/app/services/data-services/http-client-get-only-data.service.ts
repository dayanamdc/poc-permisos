import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { HttpClientDataService } from './http-client-data.service';

@Injectable()
export class HttpClientGetOnlyDataService<T> extends HttpClientDataService<T> {

  constructor(injector: Injector) {
    super(injector);
  }

  add(entity: T): Observable<T> {
    this.entities = [...this.entities || [], entity];
    return of({ ...entity });
  }

  delete(id: number | string): Observable<number | string> {
    const currentEntity = this.entities.find(e => e[this.entityIdentifier] === id);
    this.entities = [ ...this.entities.filter(e => e[this.entityIdentifier] !== id)];
    if (currentEntity) {
      return of(id);
    }
    return of(null);
  }

  update(update: import('@ngrx/entity').Update<T>): Observable<T> {
    let updatedEntity = null;
    this.entities = this.entities.map((entity) => {
      if (entity[this.entityIdentifier] === update[this.entityIdentifier]) {
        updatedEntity = {
          ...entity,
          ...update.changes
        };
        return updatedEntity;
      }
      return entity;
    });
    return of(updatedEntity);
  }

  upsert(entity: T): Observable<T> {
    if (!!entity && !!entity[this.entityIdentifier] && entity[this.entityIdentifier].toString().trim() !== '') {
      const currentEntity = this.entities.find(currentEntity => currentEntity[this.entityIdentifier] === entity[this.entityIdentifier]) || null;
      if (currentEntity) {
        return this.update({
          id: entity[this.entityIdentifier],
          changes: entity
        } as Update<T>);
      } else {
        return this.add(entity);
      }
    }
    return this.add(entity);
  }

}
