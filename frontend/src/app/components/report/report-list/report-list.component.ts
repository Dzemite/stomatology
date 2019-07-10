import { Component, OnInit } from '@angular/core';
import { EventBrokerService } from '../../../../../src/app/services/event-brocker.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  constructor(
    private _eventBrokerService: EventBrokerService
  ) { }

  ngOnInit() {
    this._eventBrokerService.emit<number>('reports-list', 1);
  }

}
