import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadersService {
  public globalPreloaderPromiseChange$: EventEmitter<Promise<any>>;

  setGlobalPreloaderPromise(promise: Promise<any>) {
    this.globalPreloaderPromiseChange$.emit(promise);
  }

  constructor() {
    this.globalPreloaderPromiseChange$ = new EventEmitter();
  }
}
