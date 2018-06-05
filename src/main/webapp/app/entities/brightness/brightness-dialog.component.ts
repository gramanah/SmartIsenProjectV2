import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Brightness } from './brightness.model';
import { BrightnessPopupService } from './brightness-popup.service';
import { BrightnessService } from './brightness.service';

@Component({
    selector: 'jhi-brightness-dialog',
    templateUrl: './brightness-dialog.component.html'
})
export class BrightnessDialogComponent implements OnInit {

    brightness: Brightness;
    isSaving: boolean;
    timeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private brightnessService: BrightnessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.brightness.id !== undefined) {
            this.subscribeToSaveResponse(
                this.brightnessService.update(this.brightness));
        } else {
            this.subscribeToSaveResponse(
                this.brightnessService.create(this.brightness));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Brightness>>) {
        result.subscribe((res: HttpResponse<Brightness>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Brightness) {
        this.eventManager.broadcast({ name: 'brightnessListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-brightness-popup',
    template: ''
})
export class BrightnessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private brightnessPopupService: BrightnessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.brightnessPopupService
                    .open(BrightnessDialogComponent as Component, params['id']);
            } else {
                this.brightnessPopupService
                    .open(BrightnessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
