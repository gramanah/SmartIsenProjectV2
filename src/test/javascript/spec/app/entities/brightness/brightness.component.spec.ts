/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmartIsenProjectV2TestModule } from '../../../test.module';
import { BrightnessComponent } from '../../../../../../main/webapp/app/entities/brightness/brightness.component';
import { BrightnessService } from '../../../../../../main/webapp/app/entities/brightness/brightness.service';
import { Brightness } from '../../../../../../main/webapp/app/entities/brightness/brightness.model';

describe('Component Tests', () => {

    describe('Brightness Management Component', () => {
        let comp: BrightnessComponent;
        let fixture: ComponentFixture<BrightnessComponent>;
        let service: BrightnessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmartIsenProjectV2TestModule],
                declarations: [BrightnessComponent],
                providers: [
                    BrightnessService
                ]
            })
            .overrideTemplate(BrightnessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BrightnessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BrightnessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Brightness(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.brightnesses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
