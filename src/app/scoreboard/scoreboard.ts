import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-scoreboard',
  imports: [],
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.css',
})
export class Scoreboard {

  supabase = inject(SupabaseService);
  scores = signal<{username: string, score: number}[]>([]);

  async ngOnInit(){
    await this.getScores();
  }

  async getScores(){
    this.scores.set(await this.supabase.getScores());
  }

}
