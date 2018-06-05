import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sensor } from './sensor.model';
import { SensorPopupService } from './sensor-popup.service';
import { SensorService } from './sensor.service';
import { Room, RoomService } from '../room';

@Component({
    selector: 'jhi-sensor-dialog',
    templateUrl: './sensor-dialog.component.html'
})
export class SensorDialogComponent implements OnInit {

    sensor: Sensor;
    isSaving: boolean;

    rooms: Room[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sensorService: SensorService,
        private roomService: RoomService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.roomService.query()
            .subscribe((res: HttpResponse<Room[]>) => { this.rooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sensor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sensorService.update(this.sensor));
        } else {
            this.subscribeToSaveResponse(
                this.sensorService.create(this.sensor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Sensor>>) {
        result.subscribe((res: HttpResponse<Sensor>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Sensor) {
        this.eventManager.broadcast({ name: 'sensorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRoomById(index: number, item: Room) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sensor-popup',
    template: ''
})
export class SensorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sensorPopupService: SensorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sensorPopupService
                    .open(SensorDialogComponent as Component, params['id']);
            } else {
                this.sensorPopupService
                    .open(SensorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
