import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { StoryComponent } from './pages/story/story.component';
import { MapComponent } from './components/map/map.component';
import {AppRoutingModule, routes} from './app-routing.module';
import {RouterModule} from '@angular/router';
import { MapGeneratorComponent } from './pages/map-generator/map-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StoryComponent,
    MapComponent,
    MapGeneratorComponent
  ],
  imports: [
		FormsModule,
		BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
