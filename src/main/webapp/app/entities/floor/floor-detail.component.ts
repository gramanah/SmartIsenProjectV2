import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Floor } from './floor.model';
import { FloorService } from './floor.service';

@Component({
    selector: 'jhi-floor-detail',
    templateUrl: './floor-detail.component.html'
})
export class FloorDetailComponent implements OnInit, OnDestroy {

    floor: Floor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private floorService: FloorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFloors();
    }

    load(id) {
        this.floorService.find(id)
            .subscribe((floorResponse: HttpResponse<Floor>) => {
                this.floor = floorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFloors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'floorListModification',
            (response) => this.load(this.floor.id)
        );
    }
}
