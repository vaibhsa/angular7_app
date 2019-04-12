import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:any;
    

  constructor() { 

  	this.products = [
		{ _id: 1, title: 'Gothic Video Game', description: 'Awesome Game!!!!', price:10, imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png'},
		{ _id: 2, title: 'Call of Duty Video Game', description: 'Meh ... nah its okay I guess', price:40, imagePath:'https://support.activision.com/servlet/servlet.FileDownload?file=00PU000000Rq6tz'},
		{ _id: 3, title: 'World of Warcraft Video Game', description: 'Also awesome? But of course it was better in vanilla ...' , price:20, imagePath:'http://eu.blizzard.com/static/_images/games/wow/wallpapers/wall2/wall2-1440x900.jpg'},
		{ _id: 4, title: 'Minecraft Video Game', description: 'Now that is super awesome!' , price: 15, imagePath: 'https://pmcdeadline2.files.wordpress.com/2014/02/minecraft__140227211000.jpg'},
		{ _id: 5, title: 'Dark Souls 3 Video Game', description: 'I Died!', price:20, imagePath: 'https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg'}
  	];

  }
  
  ngOnInit() {

  }

}

