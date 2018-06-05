import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Brightness } from './brightness.model';
import { BrightnessService } from './brightness.service';

@Component({
    selector: 'jhi-brightness-detail',
    templateUrl: './brightness-detail.component.html'
})
export class BrightnessDetailComponent implements OnInit, OnDestroy {

    brightness: Brightness;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private brightnessService: BrightnessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBrightnesses();
    }

    load(id) {
        this.brightnessService.find(id)
            .subscribe((brightnessResponse: HttpResponse<Brightness>) => {
                this.brightness = brightnessResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBrightnesses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'brightnessListModification',
            (response) => this.load(this.brightness.id)
        );
    }
}
