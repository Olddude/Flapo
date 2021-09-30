import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { of } from 'rxjs';
import { FilterOption, SortOption, ViewType } from '.';

import { PostComponent } from './post.component';
import { PostService } from './post.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let service: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DataViewModule,
        ButtonModule,
        TranslateModule.forRoot()
      ],
      declarations: [ PostComponent ],
      providers: [
        {
          provide: PostService,
          useFactory: (): Partial<PostService> => ({
            load: () => ({}),
            sort: () => ({}),
            filter: () => ({}),
            view: () => ({}),
            view$: of(ViewType.list),
            sortOption$: of<SortOption>(undefined),
            filterOption$: of<FilterOption>(undefined)
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
    component.toggleSort();
    expect(serviceSortSpy).toHaveBeenCalled();
  });

  it('should delegate to service on filter', () => {
    const serviceFilterSpy = spyOn(service, 'filter');
    component.toggleFilter();
    expect(serviceFilterSpy).toHaveBeenCalled();
  });

  it('should delegate to service on view', () => {
    const viewFilterSpy = spyOn(service, 'view');
    component.toggleView();
    expect(viewFilterSpy).toHaveBeenCalled();
  });
});
