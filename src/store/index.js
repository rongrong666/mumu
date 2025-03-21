import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async login(mobile, password) {
      try {
        const response = await axios.post('http://1.95.81.56:9002/app/v1/login', { mobile, password });
        this.token = response.data.data.token;
        localStorage.setItem('token', this.token);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token');
    }
  }
});
