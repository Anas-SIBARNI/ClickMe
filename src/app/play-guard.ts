import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { inject } from '@angular/core';

export const playGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const isAuthenticated = await supabase.isAuthenticated();

  if(isAuthenticated){
    return true;
  } else {
    return router.parseUrl('/login');
  }
  

};
