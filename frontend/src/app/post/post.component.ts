import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterOption, SortOption, ViewType } from '.';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  isLoading$ = this.service.isLoading$;
  posts$ = this.service.response$;

  sortIcons = {
    [SortOption.pricePerUnitAscending]: 'pi pi-sort-up',
    [SortOption.pricePerUnitDescending]: 'pi pi-sort-down'
  };
  currentSortIcon$ = this.service.sortOption$.pipe(
    map(sortOption => this.sortIcons[sortOption] || 'pi pi-sort')
  );

  view$ = this.service.view$;
  viewIcons = {
    [ViewType.list]: 'pi pi-list',
    [ViewType.grid]: 'pi pi-table'
  };
  currentViewIcon$ = this.service.view$.pipe(
    map(view => this.viewIcons[view])
  );

  filterIcons = {
    [FilterOption.pricePerUnitLessThanTwo]: 'pi pi-money-bill'
  };
  currentFilterIcon$ = this.service.filterOption$.pipe(
    map(filterOption => this.filterIcons[filterOption] || 'pi pi-wallet')
  );

  constructor(
    private readonly service: PostService
  ) {
    this.service.load();
  }

  toggleSort(): void {
    this.service.sort();
  }

  toggleView(): void {
    this.service.view();
  }

  toggleFilter(): void {
    this.service.filter();
  }

}
