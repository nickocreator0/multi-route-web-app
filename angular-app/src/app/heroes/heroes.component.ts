import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Hero} from "../hero";
import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';
import {Location} from "@angular/common";
import {HEROES} from "../mock-heroes";
import {of} from "rxjs";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService, private messageService: MessageService,
              private location: Location, private el: ElementRef, private renderer: Renderer2) { } // Identifies it as a HeroService injection site
  //hero = 'Ironman';
  //hero: Hero = {id: 1, name: 'Ironman'};
  //heroes = HEROES;
  // selectedHero?: Hero;

  // hovered_hero?: Hero;
  tooltipText: string = '';
  selectedHeroIdx: number = -1;
  // onHoverTimeout: any;

  heroes: Hero[] = [];


  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  /********************* Event Handlers *********************/
  goBack(): void {
    this.location.back();
  }

  // Event 2
  onHover(hero: Hero): void
  {
    // const hero = HEROES.find(h => h.id === id)!;
    // //this.messageService.add(`HeroService: fetched hero id=${id}`);
    // hero.superPower
    // HeroService.
    // return of(hero);
    // this.hovered_hero = hero;

    // this.onHoverTimeout = setTimeout(() => {
    //   alert(hero.superPower);
    // }, 100);
    this.tooltipText = hero.superPower;
  }

  // Event 3
  onHoverEnd(): void {
    //clearTimeout(this.onHoverTimeout);
    this.tooltipText = '';

  }

  // Event 7


}

