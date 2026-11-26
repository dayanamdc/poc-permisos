import {
  Component,
  Input,
  Output,
  EventEmitter,
  Injector,
} from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { environment } from "@environment";
import { BaseComponent } from "../base/base.component";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { LogoutComponent } from "../../auth/logout/logout.component";

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.scss"],
  imports: [MatToolbar, MatIconButton, MatIcon, MatTooltip, LogoutComponent],
})
export class TopnavComponent extends BaseComponent {
  public isSidebarToggled = false;
  public isMobile: boolean;
  public userData: any;
  public userName = "";
  public isProduction =
    environment.production || environment.uat ? true : false;
  public title = environment.title;
  @Input() showMenuBars = true;
  @Input() showTitle = true;
  @Output() sidebarToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    injector: Injector,
    private translate: TranslateService,
    private deviceDetectorService: DeviceDetectorService,
  ) {
    super(injector);
    this.isMobile = this.deviceDetectorService.isMobile();
    this.router.events.subscribe((val) => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isSidebarToggled
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.userData = this.authService.user;
  }

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
    this.sidebarToggled.emit(this.isSidebarToggled);
  }

  changeLang(language: string) {
    this.translate.use(language);
  }
}
