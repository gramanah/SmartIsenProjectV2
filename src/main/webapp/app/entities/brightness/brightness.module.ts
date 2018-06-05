import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartIsenProjectV2SharedModule } from '../../shared';
import {
    BrightnessService,
    BrightnessPopupService,
    BrightnessComponent,
    BrightnessDetailComponent,
    BrightnessDialogComponent,
    BrightnessPopupComponent,
    BrightnessDeletePopupComponent,
    BrightnessDeleteDialogComponent,
    brightnessRoute,
    brightnessPopupRoute,
    BrightnessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...brightnessRoute,
    ...brightnessPopupRoute,
];

@NgModule({
    imports: [
        SmartIsenProjectV2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BrightnessComponent,
        BrightnessDetailComponent,
        BrightnessDialogComponent,
        BrightnessDeleteDialogComponent,
        BrightnessPopupComponent,
        BrightnessDeletePopupComponent,
    ],
    entryComponents: [
        BrightnessComponent,
        BrightnessDialogComponent,
        BrightnessPopupComponent,
        BrightnessDeleteDialogComponent,
        BrightnessDeletePopupComponent,
    ],
    providers: [
        BrightnessService,
        BrightnessPopupService,
        BrightnessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartIsenProjectV2BrightnessModule {}
