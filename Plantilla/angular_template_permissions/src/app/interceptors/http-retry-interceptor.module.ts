import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRetryInterceptor } from './http-retry.interceptor';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [],
})

// Consider registering providers using a forRoot() method
// when the module exports components, directives or pipes that require sharing the same providers instances.
// Consider registering providers also using a forChild() method
// when they requires new providers instances or different providers in child modules.
export class HttpRetryInterceptorModule {
  /**
   * Use in AppModule: new instance of SumService.
   */
  public static forRoot(): ModuleWithProviders<HttpRetryInterceptorModule> {
    return {
      ngModule: HttpRetryInterceptorModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRetryInterceptor,
          multi: true,
        },
      ],
    };
  }

  /**
   * Use in features modules with lazy loading: new instance of SumService.
   */
  public static forChild(): ModuleWithProviders<HttpRetryInterceptorModule> {
    return {
      ngModule: HttpRetryInterceptorModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRetryInterceptor,
          multi: true,
        },
      ],
    };
  }
}
