import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SmartIsenProjectV2BrightnessModule } from './brightness/brightness.module';
import { SmartIsenProjectV2BuildingModule } from './building/building.module';
import { SmartIsenProjectV2FloorModule } from './floor/floor.module';
import { SmartIsenProjectV2RoomModule } from './room/room.module';
import { SmartIsenProjectV2SchoolModule } from './school/school.module';
import { SmartIsenProjectV2SensorModule } from './sensor/sensor.module';
import { SmartIsenProjectV2TemperatureModule } from './temperature/temperature.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SmartIsenProjectV2BrightnessModule,
        SmartIsenProjectV2BuildingModule,
        SmartIsenProjectV2FloorModule,
        SmartIsenProjectV2RoomModule,
        SmartIsenProjectV2SchoolModule,
        SmartIsenProjectV2SensorModule,
        SmartIsenProjectV2TemperatureModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartIsenProjectV2EntityModule {}
