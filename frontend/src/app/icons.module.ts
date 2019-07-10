import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ConstantsService } from './services/constants.service';

@NgModule({
  providers: [
    MatIconRegistry
  ],
})
export class Icons {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private constantsService: ConstantsService) {
    iconRegistry
      .addSvgIcon(
        'shape',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/Shape.svg'))
      .addSvgIcon(
        'shape2',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/Shape2.svg'))
      .addSvgIcon(
        'triangle',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/Triangle.svg'))
      .addSvgIcon(
        'exclamation-mark',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/exclamation-mark.svg'))
      .addSvgIcon(
        'search',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons-grey-search.svg'))
      .addSvgIcon(
        'mars',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/mars.svg'))
      .addSvgIcon(
        'femenine',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/femenine.svg'))
      .addSvgIcon(
        'zoom',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/zoom.svg'))
      .addSvgIcon(
        'arrowRight',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-right.svg'))
      .addSvgIcon(
        'upArrow',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/up-arrow.svg'))
      .addSvgIcon(
        'downArrow',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/down-arrow.svg'))
      .addSvgIcon(
        'controls',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/controls.svg'));

    for (const i in this.constantsService.registeredBodyIcons) {
      if (this.constantsService.registeredBodyIcons.hasOwnProperty(i)) {
        iconRegistry
          .addSvgIcon(
            this.constantsService.registeredBodyIcons[i],
            sanitizer.bypassSecurityTrustResourceUrl(
              this.constantsService.PATIENTS_SERVICE_CONTEXT
              + '/patient/svg/'
              + this.constantsService.registeredBodyIcons[i]
            ));
      }
    }
  }
}
