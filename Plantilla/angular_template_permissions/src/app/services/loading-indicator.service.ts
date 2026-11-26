import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoadingIndicatorService {
  isShowingLoadIndicator: boolean = false;
  loading$: Observable<boolean>;
  asyncLoadCount = 0;
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loading$ = this.loading.asObservable();
  }

  addLoading() {
    this.asyncLoadCount++;
    this.loading.next(true);
  }

  removeLoading() {
    this.asyncLoadCount = this.asyncLoadCount === 0 ? 0 : this.asyncLoadCount - 1;
    if (this.asyncLoadCount === 0) {
      this.loading.next(false);
    }
    
  }

}
