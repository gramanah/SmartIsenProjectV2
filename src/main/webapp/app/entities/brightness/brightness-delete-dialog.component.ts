import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Brightness } from './brightness.model';
import { BrightnessPopupService } from './brightness-popup.service';
import { BrightnessService } from './brightness.service';

@Component({
    selector: 'jhi-brightness-delete-dialog',
    templateUrl: './brightness-delete-dialog.component.html'
})
export class BrightnessDeleteDialogComponent {

    brightness: Brightness;

    constructor(
        private brightnessService: BrightnessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.brightnessService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'brightnessListModification',
                content: 'Deleted an brightness'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-brightness-delete-popup',
    template: ''
})
export class BrightnessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private brightnessPopupService: BrightnessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.brightnessPopupService
                .open(BrightnessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
