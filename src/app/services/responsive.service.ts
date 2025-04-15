import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => matches),
    distinctUntilChanged(),
    shareReplay(),
  );

  isTablet$ = this.breakpointObserver.observe(Breakpoints.Tablet).pipe( 
    map(({ matches }) => matches),
    distinctUntilChanged(),
    shareReplay(),
  );

  isWeb$ = this.breakpointObserver.observe(Breakpoints.Web).pipe(
    map(({ matches }) => matches),
    distinctUntilChanged(),
    shareReplay(),
  );

}
