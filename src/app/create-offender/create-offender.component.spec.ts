import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateOffenderComponent } from './create-offender.component';
import { CreateOffenderService } from './create-offender.service';

describe('CreateOffenderComponent', () => {
  let component: CreateOffenderComponent;
  let fixture: ComponentFixture<CreateOffenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOffenderComponent ],
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      providers: [CreateOffenderService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOffenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
