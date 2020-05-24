import { Component } from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  constructor(private tokenStorage: TokenStorageService) { }
}
