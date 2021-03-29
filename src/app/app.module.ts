import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PostsComponent } from './posts/posts.component';
import { FooterComponent } from './footer/footer.component';
import * as postsReducer from './store/reducers/posts.reducer';
import * as currentPostReducer from './store/reducers/currentPost.reducer';
import { PostsEffects } from './store/effects/posts.effect';
import { PostsService } from './services/posts.service';
import { CurrentPostEffects } from './store/effects/currentPost.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    PostsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      { posts: postsReducer.reducer, currentPost: currentPostReducer.reducer },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([PostsEffects, CurrentPostEffects]),
  ],
  providers: [PostsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
