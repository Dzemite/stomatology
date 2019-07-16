import { Directive, ElementRef, HostListener, Input, ViewContainerRef} from '@angular/core';
import { FilterMenuComponent } from './filter-menu.component';
import { Overlay} from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';

@Directive({
    selector: '[appFilterMenuTriggerFor]'
})
export class FilterMenuTriggerDirective {

    @Input('appFilterMenuTriggerFor') filterMenu: FilterMenuComponent;

    constructor(
        public overlay: Overlay,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private dir: Directionality
    ) { }

    @HostListener('click')
    click() {
        this.filterMenu.onTriggered(
            this.filterMenu,
            this.viewContainerRef,
            this.elementRef,
            this.overlay
        );
    }
}
