import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Floor } from './floor.model';
import { FloorPopupService } from './floor-popup.service';
import { FloorService } from './floor.service';

@Component({
    selector: 'jhi-floor-delete-dialog',
    templateUrl: './floor-delete-dialog.component.html'
})
export class FloorDeleteDialogComponent {

    floor: Floor;

    constructor(
        private floorService: FloorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.floorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'floorListModification',
                content: 'Deleted an floor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-floor-delete-popup',
    template: ''
})
export class FloorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private floorPopupService: FloorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.floorPopupService
                .open(FloorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
