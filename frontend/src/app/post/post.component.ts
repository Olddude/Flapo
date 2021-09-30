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

  private static SORT_ICONS = {
    [SortOption.pricePerUnitAscending]: 'pi pi-sort-up',
    [SortOption.pricePerUnitDescending]: 'pi pi-sort-down'
  };

  private static FILTER_ICONS = {
    [FilterOption.pricePerUnitLessThanTwo]: 'pi pi-wallet'
  };

  private static VIEW_ICONS = {
    [ViewType.list]: 'pi pi-list',
    [ViewType.grid]: 'pi pi-table'
  };

  isLoading$ = this.service.isLoading$;
  posts$ = this.service.response$;

  currentSortIcon$ = this.service.sortOption$.pipe(
    map(key => PostComponent.SORT_ICONS[key] || 'pi pi-sort')
  );

  view$ = this.service.view$;

  currentViewIcon$ = this.service.view$.pipe(
    map(view => PostComponent.VIEW_ICONS[view])
  );

  currentFilterIcon$ = this.service.filterOption$.pipe(
    map(key => PostComponent.FILTER_ICONS[key] || 'pi pi-money-bill')
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
