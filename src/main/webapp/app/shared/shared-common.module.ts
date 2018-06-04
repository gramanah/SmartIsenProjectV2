import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    SmartIsenProjectV2SharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        SmartIsenProjectV2SharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        SmartIsenProjectV2SharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class SmartIsenProjectV2SharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
