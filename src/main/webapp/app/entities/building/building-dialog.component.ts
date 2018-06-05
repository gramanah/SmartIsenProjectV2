import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Building } from './building.model';
import { BuildingPopupService } from './building-popup.service';
import { BuildingService } from './building.service';
import { School, SchoolService } from '../school';

@Component({
    selector: 'jhi-building-dialog',
    templateUrl: './building-dialog.component.html'
})
export class BuildingDialogComponent implements OnInit {

    building: Building;
    isSaving: boolean;

    schools: School[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private buildingService: BuildingService,
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
        if (this.building.id !== undefined) {
            this.subscribeToSaveResponse(
                this.buildingService.update(this.building));
        } else {
            this.subscribeToSaveResponse(
                this.buildingService.create(this.building));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Building>>) {
        result.subscribe((res: HttpResponse<Building>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Building) {
        this.eventManager.broadcast({ name: 'buildingListModification', content: 'OK'});
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
    selector: 'jhi-building-popup',
    template: ''
})
export class BuildingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private buildingPopupService: BuildingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.buildingPopupService
                    .open(BuildingDialogComponent as Component, params['id']);
            } else {
                this.buildingPopupService
                    .open(BuildingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
