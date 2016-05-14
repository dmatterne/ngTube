import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { YoutubePlayerComponent } from './youtube-player.component';

describe('Component: YoutubePlayer', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [YoutubePlayerComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([YoutubePlayerComponent],
      (component: YoutubePlayerComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(YoutubePlayerComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(YoutubePlayerComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-youtube-player></app-youtube-player>
  `,
  directives: [YoutubePlayerComponent]
})
class YoutubePlayerComponentTestController {
}

