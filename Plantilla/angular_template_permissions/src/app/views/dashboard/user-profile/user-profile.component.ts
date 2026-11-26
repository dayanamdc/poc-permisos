import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { MatDivider } from "@angular/material/divider";
import { NgxJsonViewerModule } from "ngx-json-viewer";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  imports: [MatDivider, NgxJsonViewerModule],
})
export class UserProfileComponent implements OnInit {
  user: any;
  token: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }
}
