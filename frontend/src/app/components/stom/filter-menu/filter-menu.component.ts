import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import { OverlayRef, OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { Subscription, merge } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
  exportAs: 'tooltip',
  animations: [
    trigger('tooltip', [
      state('void', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      transition('void <=> *', [
        style({
          opacity: 1
        }),
        animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ])
  ]
})
export class FilterMenuComponent implements AfterViewInit, OnDestroy {

  @Input()
  data: any;

  @Output()
  filters = new EventEmitter<any>();

  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;

  startDateFilter: Date = new Date('1.1.2016');
  endDateFilter: Date = new Date();
  cases = {
    'Подозрение': false,
    'Диагностика': false,
    'Хирургическое лечение': false,
    'Адъювантная терапия': false
  };

  private _overlayRef: OverlayRef | null = null;

  private _displayed = false;

  private _closeSubscription = Subscription.EMPTY;

  private _caseFilter: Array<string> = [];

  constructor(public dir: Directionality) { }


  /**
   *  Block for initializ the menu.
   */

  closeMenu() {
    this._overlayRef.detach();
    this._displayed = false;
  }

  ngOnDestroy() {
    this._closeSubscription.unsubscribe();
  }

  private init(overlay: Overlay, elementRef: ElementRef) {
    const overlayConfig: OverlayConfig = new OverlayConfig(<OverlayConfig>{
      hasBackdrop: true,
      direction: this.dir.value,
      backdropClass: 'cdk-overlay-transparent-backgorund'
    });

    overlayConfig.positionStrategy = overlay
      .position()
      .connectedTo(elementRef, {
        originX: 'end',
        originY: 'bottom'
      }, {
          overlayX: 'end',
          overlayY: 'top'
        })
      .withDirection(this.dir.value);

    this._overlayRef = overlay.create(overlayConfig);

    this._closeSubscription = this._menuClosingActions().subscribe(() => this.closeMenu());
  }

  /** Returns a stream that emits whenever an action that should close the menu occurs. */
  private _menuClosingActions() {
    const backdrop = this._overlayRef.backdropClick();
    const detachments = this._overlayRef.detachments();

    return merge(backdrop, detachments);
  }

  /**
   *  Functian called when the menu is need to initialize.
   *
   * @param {FilterMenuComponent} filterMenu  Menu reference.
   * @param {ViewContainerRef} viewContainerRef Some view container.
   * @param {ElementRef} elementRef Reference to element.
   * @param {Overlay} overlay Overlay.
   * @memberof FilterMenuComponent
   */
  onTriggered(
    filterMenu: FilterMenuComponent,
    viewContainerRef: ViewContainerRef,
    elementRef: ElementRef,
    overlay: Overlay
  ) {
    if (!this._displayed) {
      this._displayed = true;
      if (!this._overlayRef) {
        this.init(overlay, elementRef);
      }
      const picker = new TemplatePortal(filterMenu.template, viewContainerRef);
      this._overlayRef.attach(picker);
    }
  }
  /** End block. */



  ngAfterViewInit() { }

  cutString(str: string, len: number): string {
    if (str.length > len) {
      return `${str.slice(0, len)}...`;
    }
    return str;
  }

  formatDate(date: any): string {
    const monthNumbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    if (date instanceof Date) {
    } else {
      try {
        date = new Date(date);
      } catch (error) {
        console.error(`This string is in incorect format. -> ${date}. ERROR: ${error}`);
        return;
      }
    }

    let day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    if (('' + day).length === 1) {
      day = '0' + day;
    }

    return day + '.' + monthNumbers[monthIndex] + '.' + year;
  }

  setCaseFilter(caseName: string, checkbox: any) {
    if (this.cases[caseName] !== false && this.cases[caseName] !== true) {
      console.warn('Can\'t find case with name ' + caseName);
    }

    this.cases[caseName] = checkbox.checked;
  }

  enterFilters() {
    this.filters.emit({
      cases: this.cases,
      dates: [this.startDateFilter, this.endDateFilter]
    });
    this.closeMenu();
  }

  clearFilters() {
    for (const key in this.cases) {
      if (this.cases.hasOwnProperty(key)) {
        this.cases[key] = false;
      }
    }
    this.startDateFilter = undefined;
    this.endDateFilter = undefined;

    this.filters.emit({
      cases: this.cases,
      dates: [this.startDateFilter, this.endDateFilter]
    });
  }

  cancel() {
    this.clearFilters();
    this.closeMenu();
  }
}
