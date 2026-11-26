import { Injectable, Injector } from '@angular/core';
import { LocalStorageDataService } from './local-storage-data.service';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientDataService<T> extends LocalStorageDataService<T>{
  constructor(injector: Injector) {
    super(injector);
  }

  protected deleteFromStorage(id: string | number): Observable<string | number> {
    return this.delete(id);
  }
}
