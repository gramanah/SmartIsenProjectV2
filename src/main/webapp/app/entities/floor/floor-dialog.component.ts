import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Floor } from './floor.model';
import { FloorPopupService } from './floor-popup.service';
import { FloorService } from './floor.service';
import { School, SchoolService } from '../school';

@Component({
    selector: 'jhi-floor-dialog',
    templateUrl: './floor-dialog.component.html'
})
export class FloorDialogComponent implements OnInit {

    floor: Floor;
    isSaving: boolean;

    schools: School[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private floorService: FloorService,
        private schoolService: SchoolService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.schoolService.query()
            .subscribe((res: HttpResponse<School[]>) => { this.schools = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.floor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.floorService.update(this.floor));
        } else {
            this.subscribeToSaveResponse(
                this.floorService.create(this.floor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Floor>>) {
        result.subscribe((res: HttpResponse<Floor>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Floor) {
        this.eventManager.broadcast({ name: 'floorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSchoolById(index: number, item: School) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-floor-popup',
    template: ''
})
export class FloorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private floorPopupService: FloorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.floorPopupService
                    .open(FloorDialogComponent as Component, params['id']);
            } else {
                this.floorPopupService
                    .open(FloorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
