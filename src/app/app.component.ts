import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'adminpro';

  constructor(
    private settingService:SettingsService
  ){  }

  ngOnInit(): void {
    
  }
  
}
