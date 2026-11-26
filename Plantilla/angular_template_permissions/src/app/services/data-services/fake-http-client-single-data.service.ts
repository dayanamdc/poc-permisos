import { Injectable, Injector } from '@angular/core';
import { LocalStorageDataService } from './local-storage-data.service';

@Injectable()
export class HttpClientSingleDataService<T> extends LocalStorageDataService<T> {

  constructor(injector: Injector) {
    super(injector);
  }

}
