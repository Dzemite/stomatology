import { InjectionToken } from '@angular/core';
import { IStomConfig } from '../interfaces/i-stom-config';

export const APP_CONFIG = new InjectionToken<IStomConfig>('APP_CONFIG');
