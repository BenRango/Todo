import { Component } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";

@Component({
  selector: 'app-welcome',
  imports: [SearchBar],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {

}
