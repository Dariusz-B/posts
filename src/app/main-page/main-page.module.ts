import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from '../store/effects/posts.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, EffectsModule.forFeature([PostsEffects])
  ]
})
export class MainPageModule { }
