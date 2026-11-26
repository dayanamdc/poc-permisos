import {
  Component,
  Input,
  EventEmitter,
  Output,
  Injector,
} from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { BaseComponent } from "../base/base.component";
import { NgClass, NgStyle } from "@angular/common";
import {
  MatNavList,
  MatListItem,
  MatListSubheaderCssMatStyler,
} from "@angular/material/list";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  imports: [
    NgClass,
    MatNavList,
    MatListItem,
    RouterLinkActive,
    RouterLink,
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatListSubheaderCssMatStyler,
    MatDivider,
    NgStyle,
    TranslatePipe,
  ],
})
export class SidebarComponent extends BaseComponent {
  public showMenu: string;

  constructor(injector: Injector) {
    super(injector);
  }

  @Input() collapsed: boolean = false;
  @Output() sidebarCollapsed: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  ngOnInit() {
    this.showMenu = "";
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = "0";
    } else {
      this.showMenu = element;
    }
  }

  expand() {
    this.collapsed = false;
    this.sidebarCollapsed.emit(this.collapsed);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.sidebarCollapsed.emit(this.collapsed);
  }
}
