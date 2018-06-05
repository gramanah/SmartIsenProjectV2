import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Room } from './room.model';
import { RoomPopupService } from './room-popup.service';
import { RoomService } from './room.service';
import { User, UserService } from '../../shared';
import { Floor, FloorService } from '../floor';
import { Building, BuildingService } from '../building';

@Component({
    selector: 'jhi-room-dialog',
    templateUrl: './room-dialog.component.html'
})
export class RoomDialogComponent implements OnInit {

    room: Room;
    isSaving: boolean;

    users: User[];

    floors: Floor[];

    buildings: Building[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roomService: RoomService,
        private userService: UserService,
        private floorService: FloorService,
        private buildingService: BuildingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.floorService.query()
            .subscribe((res: HttpResponse<Floor[]>) => { this.floors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.buildingService.query()
            .subscribe((res: HttpResponse<Building[]>) => { this.buildings = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.room.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roomService.update(this.room));
        } else {
            this.subscribeToSaveResponse(
                this.roomService.create(this.room));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Room>>) {
        result.subscribe((res: HttpResponse<Room>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Room) {
        this.eventManager.broadcast({ name: 'roomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackFloorById(index: number, item: Floor) {
        return item.id;
    }

    trackBuildingById(index: number, item: Building) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-room-popup',
    template: ''
})
export class RoomPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roomPopupService: RoomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roomPopupService
                    .open(RoomDialogComponent as Component, params['id']);
            } else {
                this.roomPopupService
                    .open(RoomDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
