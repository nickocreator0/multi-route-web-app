import { Component, Input } from '@angular/core';
import {Hero} from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(
    /* Inject the ActivatedRoute, HeroService, and Location services into the constructor,
       saving their values in private fields */
    private route: ActivatedRoute, // holds information about the route to this instance of the HeroDetailComponent
    private heroService: HeroService, // gets hero data from the remote server and this component uses it to get the hero-to-display
    private location: Location // Angular service to interact with the browser
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  /*** Event Handlers ***/
  goBack(): void {
    this.location.back();
  }

  // Event 5: file selection handler
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.uploadImage(file);
  }

  // Event 5: drop handler
  onDrop(event: any): void {
    // Prevent default event handler
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    this.uploadImage(file);
  }

  // Event 6: drag over handler
  onDragOver(event: any): void{
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    this.uploadImage(file);
  }

  // Event 5: upload image
  uploadImage(file: File): void {
    if(this.hero)
      this.hero.imageUrl = URL.createObjectURL(file);
  }

}
