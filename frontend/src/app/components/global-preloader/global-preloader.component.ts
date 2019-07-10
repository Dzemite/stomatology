import { Component, OnInit } from '@angular/core';
import { PreloadersService } from '../../../../src/app/services/preloaders.service';

@Component({
  selector: 'app-global-preloader',
  templateUrl: './global-preloader.component.html',
  styleUrls: ['./global-preloader.component.scss']
})
export class GlobalPreloaderComponent implements OnInit {

  showPreloader: boolean;
  constructor(private _preloadersService: PreloadersService) {
    this._preloadersService.globalPreloaderPromiseChange$.subscribe((promise) => {
      this.showPreloader = true;
      promise.then(() => {
        this.showPreloader = false;
      })
      .catch(() => {
        this.showPreloader = false;
      });
    });
  }

  ngOnInit() {
  }

}
