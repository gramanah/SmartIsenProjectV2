/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { TemperatureDetailComponent } from '../../../../../../main/webapp/app/entities/temperature/temperature-detail.component';
import { TemperatureService } from '../../../../../../main/webapp/app/entities/temperature/temperature.service';
import { Temperature } from '../../../../../../main/webapp/app/entities/temperature/temperature.model';

describe('Component Tests', () => {

    describe('Temperature Management Detail Component', () => {
        let comp: TemperatureDetailComponent;
        let fixture: ComponentFixture<TemperatureDetailComponent>;
        let service: TemperatureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [TemperatureDetailComponent],
                providers: [
                    TemperatureService
                ]
            })
            .overrideTemplate(TemperatureDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemperatureDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemperatureService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Temperature(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.temperature).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
