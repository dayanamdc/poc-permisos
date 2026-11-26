import { Directive, Injector } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../../components/base/base.component";
import { NgxPermissionsService } from "ngx-permissions";

@Directive()
export class PageBaseComponent extends BaseComponent {
  protected activatedRoute: ActivatedRoute;
  protected permissionsService: NgxPermissionsService;

  constructor(injector: Injector) {
    super(injector);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.permissionsService = injector.get(NgxPermissionsService);
  }

  hasPermissions(roles: string[]) {
    let hasPermissions = false;
    roles.forEach((role) => {
      if (!hasPermissions)
        if (this.permissionsService.getPermissions()[role])
          hasPermissions = !!this.permissionsService.getPermissions()[role];
    });
    return hasPermissions;
  }
}
