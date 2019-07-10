import { InjectionToken } from '@angular/core';
import { IOnkoConfig } from '../interfaces/i-onko-config';

export const APP_CONFIG = new InjectionToken<IOnkoConfig>('APP_CONFIG');
