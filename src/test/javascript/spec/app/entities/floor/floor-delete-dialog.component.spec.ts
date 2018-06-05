/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { FloorDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/floor/floor-delete-dialog.component';
import { FloorService } from '../../../../../../main/webapp/app/entities/floor/floor.service';

describe('Component Tests', () => {

    describe('Floor Management Delete Component', () => {
        let comp: FloorDeleteDialogComponent;
        let fixture: ComponentFixture<FloorDeleteDialogComponent>;
        let service: FloorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [FloorDeleteDialogComponent],
                providers: [
                    FloorService
                ]
            })
            .overrideTemplate(FloorDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FloorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FloorService);
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
