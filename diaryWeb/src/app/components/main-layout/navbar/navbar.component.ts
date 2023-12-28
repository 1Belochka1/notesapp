import { Location, NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { SvgArrowComponent } from '../../svg/arrow/svg-arrow.component';
import { SvgBackComponent } from '../../svg/back/svg-back.component';
import { navbarData } from '../navbar.data';

@Component({
  selector: '[navbar]',
  standalone: true,
  imports: [
    SvgArrowComponent,
    SvgBackComponent,
    NgComponentOutlet,
    RouterLink,
    NgIf,
    NgFor,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavbarShort: boolean = false;
  navbarData = navbarData;
  isBack: boolean = false;
  paramsRouteSubscription: Subscription | undefined;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private location: Location
  ) {
    this.paramsRouteSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isBack =
          this._route.firstChild?.snapshot.paramMap.has('id') ?? false;
      });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.paramsRouteSubscription?.unsubscribe();
  }

  ngOnInit(): void {}
}
