import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Brightness } from './brightness.model';
import { BrightnessService } from './brightness.service';

@Injectable()
export class BrightnessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private brightnessService: BrightnessService

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
                this.brightnessService.find(id)
                    .subscribe((brightnessResponse: HttpResponse<Brightness>) => {
                        const brightness: Brightness = brightnessResponse.body;
                        if (brightness.time) {
                            brightness.time = {
                                year: brightness.time.getFullYear(),
                                month: brightness.time.getMonth() + 1,
                                day: brightness.time.getDate()
                            };
                        }
                        this.ngbModalRef = this.brightnessModalRef(component, brightness);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.brightnessModalRef(component, new Brightness());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    brightnessModalRef(component: Component, brightness: Brightness): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.brightness = brightness;
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
