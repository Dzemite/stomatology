import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @Input()
  selected: number;

  patientID = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
      if (this.route.snapshot.params.id && this.patientID !== 7) {
        this.patientID = this.route.snapshot.params.id;
      } else if (this.route.snapshot.params.id && this.patientID > 7) {
        this.patientID = 1;
      }
  }

  next(): void {
      if (this.patientID !== 7) {
        ++this.patientID;
        this.router.navigate(['patient/5c06a18a915a4cb6dbec9779/' + this.patientID]);
      }
  }

  previous(): void {
      if (this.patientID !== 1) {
        --this.patientID;
        this.router.navigate(['patient/5c06a18a915a4cb6dbec9779/' + this.patientID]);
      }
  }
}
