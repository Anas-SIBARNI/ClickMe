import { Component, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private supabase = inject(SupabaseService);
  private router = inject(Router);


  async handleLogin(email: string, password: string) {
    try {
      
      await this.supabase.login(email, password);
      console.log('Login successful');
      this.router.navigate(['/play']);

    } catch(error) {
      console.error('Login failed', error);
      alert('Login failed: ' + error);
    }
  }

}
