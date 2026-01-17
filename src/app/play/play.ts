import { Component } from '@angular/core';
import { Counter } from "../counter/counter";
import { Scoreboard } from "../scoreboard/scoreboard";

@Component({
  selector: 'app-play',
  imports: [Counter, Scoreboard],
  templateUrl: './play.html',
  styleUrl: './play.css',
})
export class Play {

}
