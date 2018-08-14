import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {StoryComponent} from './pages/story/story.component';
import {MapGeneratorComponent} from './pages/map-generator/map-generator.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'map',
    component: MapGeneratorComponent
  },
  {
    path: 'story/:pageId',
    component: StoryComponent
  }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
