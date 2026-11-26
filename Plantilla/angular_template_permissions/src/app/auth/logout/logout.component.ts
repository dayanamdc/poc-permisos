import { Component, Input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { AuthService } from "../auth.service";
import { MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { NgClass } from "@angular/common";

@Component({
  selector: "sgs-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
  providers: [],
  imports: [MatIconButton, MatTooltip, MatIcon, NgClass, TranslatePipe],
})
export class LogoutComponent {
  @Input() iconOnly = false;
  @Input() color = "primary";

  user!: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}
