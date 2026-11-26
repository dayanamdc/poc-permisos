import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  public promptEvent: any;
  public updateExists = false;

  constructor(private swUpdate: SwUpdate) {
    if (swUpdate.isEnabled) {
      interval(20 * 1000).subscribe(() =>
        swUpdate.checkForUpdate().then(() => {})
      );
    }
  }

  public checkForUpdates(): boolean {
    this.swUpdate.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        this.updateExists = true;
      }
    });
    return this.updateExists;
  }

  public reloadPage(): void {
    this.swUpdate.activateUpdate().then(() => {
      this.updateExists = false;
    });
  }
}
