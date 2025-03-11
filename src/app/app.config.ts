import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";
import { provideRouter, withComponentInputBinding, withPreloading, PreloadAllModules } from "@angular/router";
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { RouteReuseStrategy } from "@angular/router";
  import { refreshTokenInterceptor } from "./interceptors/refresh-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
    provideIonicAngular(),
    provideHttpClient(withInterceptors([refreshTokenInterceptor])),
  ],
};
