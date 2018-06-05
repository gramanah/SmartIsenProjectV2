/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { BrightnessDetailComponent } from '../../../../../../main/webapp/app/entities/brightness/brightness-detail.component';
import { BrightnessService } from '../../../../../../main/webapp/app/entities/brightness/brightness.service';
import { Brightness } from '../../../../../../main/webapp/app/entities/brightness/brightness.model';

describe('Component Tests', () => {

    describe('Brightness Management Detail Component', () => {
        let comp: BrightnessDetailComponent;
        let fixture: ComponentFixture<BrightnessDetailComponent>;
        let service: BrightnessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [BrightnessDetailComponent],
                providers: [
                    BrightnessService
                ]
            })
            .overrideTemplate(BrightnessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BrightnessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrightnessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Brightness(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.brightness).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
