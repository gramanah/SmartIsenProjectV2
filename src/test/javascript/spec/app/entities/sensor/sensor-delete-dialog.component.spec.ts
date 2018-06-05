/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { SensorDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/sensor/sensor-delete-dialog.component';
import { SensorService } from '../../../../../../main/webapp/app/entities/sensor/sensor.service';

describe('Component Tests', () => {

    describe('Sensor Management Delete Component', () => {
        let comp: SensorDeleteDialogComponent;
        let fixture: ComponentFixture<SensorDeleteDialogComponent>;
        let service: SensorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [SensorDeleteDialogComponent],
                providers: [
                    SensorService
                ]
            })
            .overrideTemplate(SensorDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SensorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
