import { ComponentFixture, TestBed } from '@angular/core/testing';

import { guestreportComponent } from './guestreport.component';
import {HttpClientModule} from '@angular/common/http';
import { guestreportService } from './guestreport.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('guestreportComponent', () => {
  let component: guestreportComponent;
  let fixture: ComponentFixture<guestreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ guestreportComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [guestreportService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(guestreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
