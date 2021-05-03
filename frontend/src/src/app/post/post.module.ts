import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './post.effects';
import { PostComponent } from './post.component';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    EffectsModule.forFeature([PostEffects]),

    DataViewModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class PostModule { }
