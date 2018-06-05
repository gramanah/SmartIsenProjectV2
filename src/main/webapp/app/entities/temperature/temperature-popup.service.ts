import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Temperature } from './temperature.model';
import { TemperatureService } from './temperature.service';

@Injectable()
export class TemperaturePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private temperatureService: TemperatureService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.temperatureService.find(id)
                    .subscribe((temperatureResponse: HttpResponse<Temperature>) => {
                        const temperature: Temperature = temperatureResponse.body;
                        if (temperature.time) {
                            temperature.time = {
                                year: temperature.time.getFullYear(),
                                month: temperature.time.getMonth() + 1,
                                day: temperature.time.getDate()
                            };
                        }
                        this.ngbModalRef = this.temperatureModalRef(component, temperature);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.temperatureModalRef(component, new Temperature());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    temperatureModalRef(component: Component, temperature: Temperature): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.temperature = temperature;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
