import { Component, OnInit } from '@angular/core';
import { ConstantsService } from './services/constants.service';
import { EventBrokerService } from './services/event-brocker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  systemParentName: string;
  systemName: string;

  selectTab: number;

  constructor(
    private _constantsService: ConstantsService,
    private _eeventBrokerService: EventBrokerService
  ) {}

  ngOnInit(): void {
    this._constantsService.favicons.forEach( favicon => {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'apple-touch-icon');
      linkElement.setAttribute('type', 'image/x-icon');
      linkElement.setAttribute('href', favicon.faviconUrl);
      document.head.appendChild(linkElement);
    });

    const titleElement = document.createElement('title');
    titleElement.textContent = this._constantsService.title;
    document.head.appendChild(titleElement);

    this.systemName = this._constantsService.breadcrumbs.systemName;
    this.systemParentName = this._constantsService.breadcrumbs.parentName;

    this._eeventBrokerService.listen('patients-list', (value) => {
      setTimeout(() => {
        this.selectTab = value as number;
      }, 0);
    });
    this._eeventBrokerService.listen('reports-list', (value) => {
      setTimeout(() => {
        this.selectTab = value as number;
      }, 0);
    });
    this._eeventBrokerService.listen('clear', (value) => {
      setTimeout(() => {
        this.selectTab = value as number;
      }, 0);
    });
  }

  loging(event: any) {
    console.log(event);
  }
}
