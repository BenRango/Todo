import { Component } from '@angular/core';
import {input} from '@angular/core'
@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  value = input("")
}
