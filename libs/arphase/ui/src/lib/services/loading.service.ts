import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  set activeProcesses(value: number) {
    if (value < 0) {
      this._activeProcesses = 0;
      return;
    }
    this._activeProcesses = value;
  }
  get activeProcesses() {
    return this._activeProcesses;
  }
  set activeGetProcesses(value: number) {
    if (value < 0) {
      this._activeGetProcesses = 0;
      return;
    }
    this._activeGetProcesses = value;
  }
  get activeGetProcesses() {
    return this._activeGetProcesses;
  }
  set activeElseProcesses(value: number) {
    if (value < 0) {
      this._activeElseProcesses = 0;
      return;
    }
    this._activeElseProcesses = value;
  }
  get activeElseProcesses() {
    return this._activeElseProcesses;
  }
  private _activeProcesses = 0;
  private _activeGetProcesses = 0;
  private _activeElseProcesses = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.pipe(
    delay(0),
    map(isLoading => isLoading || this.activeProcesses !== 0)
  );
  loadingGet$ = this.loadingSubject.pipe(
    delay(0),
    map(() => this.activeGetProcesses !== 0)
  );
  loadingElse$ = this.loadingSubject.pipe(
    delay(0),
    map(() => this.activeElseProcesses !== 0)
  );

  show(method?: string): void {
    this.activeProcesses++;
    method === 'GET' ? this.activeGetProcesses++ : this.activeElseProcesses++;
    this.loadingSubject.next(true);
  }

  hide(method?: string): void {
    this.activeProcesses--;
    method === 'GET' ? this.activeGetProcesses-- : this.activeElseProcesses--;
    this.loadingSubject.next(false);
  }
}
