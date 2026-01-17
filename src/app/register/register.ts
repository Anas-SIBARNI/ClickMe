import { Component, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private supabase = inject(SupabaseService);
  private router = inject(Router);

  async handleRegister(username: string, email: string, password: string){

    try{
      await this.supabase.register(username, email, password);
      try{
        await this.supabase.login(email, password);
        this.router.navigate(['/play']);
      } catch(error){
        alert("Register succeeded but login failed : " + error);
      }
    } catch(error){
      alert("Register failed : " + error);
    }

  }
}
