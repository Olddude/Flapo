import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostService } from './post.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let service: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      providers: [
        {
          provide: PostService,
          useFactory: () => ({
            load: () => ({}),
            sort: () => ({}),
            filter: () => ({}),
            view: () => ({})
          })
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delegate to service on sort', () => {
    const serviceSortSpy = spyOn(service, 'sort');
    component.sort();
    expect(serviceSortSpy).toHaveBeenCalled();
  });

  it('should delegate to service on filter', () => {
    const serviceFilterSpy = spyOn(service, 'filter');
    component.filter();
    expect(serviceFilterSpy).toHaveBeenCalled();
  });

  it('should delegate to service on view', () => {
    const viewFilterSpy = spyOn(service, 'view');
    component.view();
    expect(viewFilterSpy).toHaveBeenCalled();
  });
});
