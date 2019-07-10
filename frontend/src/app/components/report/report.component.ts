import { Component, OnInit } from '@angular/core';
import { EventBrokerService } from '../../../../src/app/services/event-brocker.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(
    private _eventBrokerService: EventBrokerService
  ) { }

  ngOnInit() {
    this._eventBrokerService.emit<number>('clear', null);
  }

}
