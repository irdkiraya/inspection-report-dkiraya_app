<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
    <div class="bg-white p-8 rounded-2xl shadow-md border border-slate-200 w-full max-w-md">
      <!-- Logo / Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">ASTRA DAIHATSU</h1>
        <p class="text-xs text-slate-500 font-medium mt-1">Inspection Report System</p>
      </div>

      <!-- Alert Error -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold rounded-xl text-center">
        {{ errorMessage }}
      </div>

      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Email User</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="Masukkan email..." 
            required
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Password</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="Masukkan password..." 
            required
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
          />
        </div>

        <button 
          type="submit" 
          class="w-full bg-[#1d61e7] hover:bg-[#1553cb] text-white font-semibold text-sm py-3 rounded-xl shadow-sm transition-colors mt-2"
        >
          Masuk ke Sistem
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login-success'])

const email = ref('')
const password = ref('')
const errorMessage = ref('')

// Data Akun User & Hak Akses Cabang
const usersDatabase = [
  {
    email: 'ircitraraya@gmail.com',
    password: 'Citra123',
    cabangNama: 'Citra Raya',
    cabangId: 'citra-raya',
    lokasi: 'Citra Raya · Banten'
  },
  {
    email: 'irserang@gmail.com',
    password: 'Serang123',
    cabangNama: 'Serang',
    cabangId: 'serang',
    lokasi: 'Serang · Banten'
  }
]

const handleLogin = () => {
  const foundUser = usersDatabase.find(
    u => u.email.toLowerCase() === email.value.trim().toLowerCase() && u.password === password.value
  )

  if (foundUser) {
    errorMessage.value = ''
    emit('login-success', foundUser)
  } else {
    errorMessage.value = 'Email atau Password salah! Periksa kembali kredensial Anda.'
  }
}
</script>