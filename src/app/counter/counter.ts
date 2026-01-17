import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {

  supabase = inject(SupabaseService);
  counter = signal(0);

  async ngOnInit(){
    this.counter.set(await this.supabase.getScore());
  }
  

  increment(){
    this.counter.update( (counter) => counter + 1);
    this.supabase.updateScore(this.counter());
  }

}
