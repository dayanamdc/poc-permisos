import { Component, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Breadcrumb } from "primeng/breadcrumb";
import { filter } from "rxjs";

@Component({
  selector: "rfs-breadcrumb",
  imports: [Breadcrumb],
  templateUrl: "./breadcrumb.component.html",
  styleUrl: "./breadcrumb.component.scss",
})
export class BreadcrumbComponent {
  private readonly router = inject(Router);

  @Input() divider = ">";
  breadcrumbItems: MenuItem[] = [];

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.setBreadcrumbs());
    this.setBreadcrumbs();
  }

  private setBreadcrumbs(): void {
    const segments = this.router.url
      .split("?")[0]
      .split("/")
      .filter(Boolean)
      .filter((segment) => segment !== "application");

    this.breadcrumbItems = segments.map((segment, index) => ({
      label: decodeURIComponent(segment),
      routerLink:
        index === segments.length - 1
          ? []
          : ["/" + segments.slice(0, index + 1).join("/")],
    }));
  }
}
