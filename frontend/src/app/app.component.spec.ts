import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set default language from environment config on creation', () => {
    const translateService = TestBed.inject(TranslateService);
    const setDefaultLanguageSpy = spyOn(translateService, 'setDefaultLang');
    TestBed.createComponent(AppComponent);
    expect(setDefaultLanguageSpy).toHaveBeenCalledWith(environment.defaultLanguage);
  });

  it('should render main router outlet inside app div', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('main > router-outlet')).toBeTruthy();
  });
});
