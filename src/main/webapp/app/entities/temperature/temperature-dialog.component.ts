import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Temperature } from './temperature.model';
import { TemperaturePopupService } from './temperature-popup.service';
import { TemperatureService } from './temperature.service';
import { Sensor, SensorService } from '../sensor';

@Component({
    selector: 'jhi-temperature-dialog',
    templateUrl: './temperature-dialog.component.html'
})
export class TemperatureDialogComponent implements OnInit {

    temperature: Temperature;
    isSaving: boolean;

    sensors: Sensor[];
    timeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private temperatureService: TemperatureService,
        private sensorService: SensorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sensorService
            .query({filter: 'temperature-is-null'})
            .subscribe((res: HttpResponse<Sensor[]>) => {
                if (!this.temperature.sensor || !this.temperature.sensor.id) {
                    this.sensors = res.body;
                } else {
                    this.sensorService
                        .find(this.temperature.sensor.id)
                        .subscribe((subRes: HttpResponse<Sensor>) => {
                            this.sensors = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.temperature.id !== undefined) {
            this.subscribeToSaveResponse(
                this.temperatureService.update(this.temperature));
        } else {
            this.subscribeToSaveResponse(
                this.temperatureService.create(this.temperature));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Temperature>>) {
        result.subscribe((res: HttpResponse<Temperature>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Temperature) {
        this.eventManager.broadcast({ name: 'temperatureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSensorById(index: number, item: Sensor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-temperature-popup',
    template: ''
})
export class TemperaturePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private temperaturePopupService: TemperaturePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.temperaturePopupService
                    .open(TemperatureDialogComponent as Component, params['id']);
            } else {
                this.temperaturePopupService
                    .open(TemperatureDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
