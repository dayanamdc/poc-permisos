import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerPageComponent } from '../base/container-page.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, ContainerPageComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
