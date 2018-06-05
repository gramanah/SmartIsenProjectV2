import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartIsenProjectV2SharedModule } from '../../shared';
import {
    FloorService,
    FloorPopupService,
    FloorComponent,
    FloorDetailComponent,
    FloorDialogComponent,
    FloorPopupComponent,
    FloorDeletePopupComponent,
    FloorDeleteDialogComponent,
    floorRoute,
    floorPopupRoute,
    FloorResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...floorRoute,
    ...floorPopupRoute,
];

@NgModule({
    imports: [
        SmartIsenProjectV2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FloorComponent,
        FloorDetailComponent,
        FloorDialogComponent,
        FloorDeleteDialogComponent,
        FloorPopupComponent,
        FloorDeletePopupComponent,
    ],
    entryComponents: [
        FloorComponent,
        FloorDialogComponent,
        FloorPopupComponent,
        FloorDeleteDialogComponent,
        FloorDeletePopupComponent,
    ],
    providers: [
        FloorService,
        FloorPopupService,
        FloorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartIsenProjectV2FloorModule {}
