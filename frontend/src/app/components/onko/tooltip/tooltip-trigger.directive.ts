import { Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';

@Directive({
    selector: '[appTooltipTriggerFor]'
})
export class TooltipTriggerDirective {
    private _overlayRef: OverlayRef;

    private _displayed = false;

    @Input('appTooltipTriggerFor') tooltip: TooltipComponent;

    constructor(public overlay: Overlay,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private dir: Directionality) { }

    private init() {
        const overlayConfig: OverlayConfig = new OverlayConfig(<OverlayConfig>{
            hasBackdrop: true,
            direction: this.dir.value,
            backdropClass: 'cdk-overlay-transparent-backgorund'
        });

        overlayConfig.positionStrategy = this.overlay
            .position()
            .connectedTo(this.elementRef, {
                originX: 'end',
                originY: 'bottom'
            }, {
                    overlayX: 'end',
                    overlayY: 'top'
                })
            .withDirection(this.dir.value);

        this._overlayRef = this.overlay.create(overlayConfig);
    }

    @HostListener('mouseenter')
    hover() {
        if (!this._displayed) {
            this._displayed = true;
            if (!this._overlayRef) {
                this.init();
            }
            const picker = new TemplatePortal(this.tooltip.template, this.viewContainerRef);
            this._overlayRef.attach(picker);
        }
    }

    @HostListener('mouseleave')
    out() {
        this._overlayRef.detach();
        this._displayed = false;
    }
}
