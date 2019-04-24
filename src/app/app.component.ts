import { Component } from '@angular/core';
import {AuthService} from './services/auth.services';
import { CartService } from './services/cart.services';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	
  title = 'app';

  constructor(public auth: AuthService, public cartService: CartService) {
  	// localStorage.removeItem("qty");
  }

  ngOnInit() {}

}





















