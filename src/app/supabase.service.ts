import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if(error) {
      throw error;
    }
    return data;
  }

  async register(username: string, email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          data: {
            username: username
          }
        }
      }
    )

    if(error){
      throw error;
    }
    return data;
  }

  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await this.supabase.auth.getSession(); 
    return session != null;
  }

  async getUserAccount() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }
  
  async getScore(): Promise<number> {
    const user = await this.getUserAccount();
    if (!user) return 0;
  
    const { data, error } = await this.supabase
      .from('profiles')
      .select('score')
      .eq('id', user.id)
      .single();
  
    if (error || !data) return 0;

    return data.score;
  }

  async updateScore(score: number){
    const user = await this.getUserAccount();
    if(user == null) {
      console.log("Score haven't been updated in database");
      return;
    }
    const { error } = await this.supabase
      .from('profiles')
      .upsert({ id: user.id, score: score, username: user.user_metadata['username'] })
      .select();

    if(error){
      console.log("Error when try to update score : " + error.message);
    }
  }

  async getScores(): Promise<{username: string, score: number}[]>{
    const { data, error } = await this.supabase
      .from('scoreboard_public')
      .select('username, score')
      .order('score', { ascending: false });

    if(error){
      console.log("Error when try to get scores : " + error.message);

    }

    return data || [];
  }
}