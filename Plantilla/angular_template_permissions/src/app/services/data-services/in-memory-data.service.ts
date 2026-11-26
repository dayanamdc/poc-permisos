import { Injectable, Injector } from '@angular/core';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { LoggerService } from '../logger.service';

@Injectable()
export class InMemoryDataService<T> implements EntityCollectionDataService<T> {
  name: string;
  entities: T[] = [];
  entityIdentifier = 'id';
  protected logger!: LoggerService;

  constructor(injector: Injector) {
    this.logger = injector.get(LoggerService);
  }

  add(entity: T): Observable<T> {
    this.logger.info('Storage add');
    const currentEntity = { ...entity };
    currentEntity[this.entityIdentifier] = entity[this.entityIdentifier] || (this.entities ? this.entities.length + 1 : 1);
    this.entities = [...this.entities || [], currentEntity];
    return of(currentEntity);
  }

  delete(id: number | string): Observable<number | string> {
    this.entities = this.entities.filter(e => e[this.entityIdentifier] !== id);
    return of(id);
  }

  getAll(): Observable<T[]> {
    return of([...this.entities || []]);
  }

  getById(id: number | string): Observable<T> {
    const filteredEntities = this.entities.filter(entity => entity[this.entityIdentifier] === id);
    return of(filteredEntities.length > 0 ? { ...filteredEntities[0] } : null);
  }

  getWithQuery(params: QueryParams): Observable<T[]> {
    let filteredEntities = [...this.entities];
    for (const param in params) {
      if (param) {
        filteredEntities = filteredEntities.filter(
          (entity) => entity[param] === params[param].toString()
        );
      }
    }
    this.entities = [...filteredEntities];
    return of([...filteredEntities]);
  }

  update(update: import('@ngrx/entity').Update<T>): Observable<T> {
    let updatedEntity = null;
    this.entities = [...this.entities.map((e) => {
      if (e[this.entityIdentifier] === update.id) {
        updatedEntity = {
          ...e,
          ...update.changes
        };
        return updatedEntity;
      }
      return e;
    })];
    return of(updatedEntity);
  }

  upsert(entity: T): Observable<T> {
    return this.getById(entity[this.entityIdentifier]).pipe(map(currentEntity => {
      if (currentEntity) {
        this.update({
          id: entity[this.entityIdentifier],
          changes: entity
        } as Update<T>);
        return entity;
      } else {
        this.add(entity);
        return entity;
      }
    }));
  }

  patch(entity: T): Observable<T> {
    return this.getById(entity[this.entityIdentifier]).pipe(map(currentEntity => {
      if (currentEntity) {
        this.update({
          id: entity[this.entityIdentifier],
          changes: entity
        } as Update<T>);
        return entity;
      } else {
        this.add(entity);
        return entity;
      }
    }));
  }

}
