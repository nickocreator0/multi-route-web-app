import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditArticleComponent } from './reddit-article.component';

describe('RedditArticleComponent', () => {
  let component: RedditArticleComponent;
  let fixture: ComponentFixture<RedditArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedditArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
