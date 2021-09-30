import { Component } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  isLoading$ = this.service.isLoading$;
  posts$ = this.service.response$;
  view$ = this.service.view$;

  constructor(
    private readonly service: PostService
  ) {
    this.service.load();
  }

  sort(): void {
    this.service.sort();
  }

  view(): void {
    this.service.view();
  }

  filter(): void {
    this.service.filter();
  }

}
