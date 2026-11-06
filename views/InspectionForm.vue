<template>
  <!-- Jika Belum Login: Tampilkan Halaman Login -->
  <div v-if="!currentUser" class="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
    <div class="bg-white p-8 rounded-2xl shadow-md border border-slate-200 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">ASTRA DAIHATSU</h1>
        <p class="text-xs text-slate-500 font-medium mt-1">Inspection Report System</p>
      </div>

      <div v-if="errorMessage" class="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold rounded-xl text-center">
        {{ errorMessage }}
      </div>

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

  <!-- Jika Sudah Login: Tampilkan Dashboard Cabang -->
  <div v-else class="flex min-h-screen bg-slate-100 text-slate-800 font-sans p-4 gap-4 relative">
    <!-- Sidebar Kiri -->
    <aside class="w-64 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between p-5 shrink-0">
      <div>
        <div class="mb-8">
          <h1 class="text-xl font-bold tracking-tight text-slate-900">ASTRA DAIHATSU</h1>
          <p class="text-xs text-sky-600 font-bold uppercase tracking-wider mt-0.5">{{ currentUser.cabangNama }}</p>
        </div>

        <nav class="space-y-2">
          <button 
            @click="currentTab = 'data'"
            :class="currentTab === 'data' ? 'text-sky-600 bg-sky-50 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'"
            class="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            Data Inspeksi
          </button>

          <button 
            @click="currentTab = 'input'"
            :class="currentTab === 'input' ? 'text-sky-600 bg-sky-50 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'"
            class="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Input Form
          </button>

          <button 
            @click="currentTab = 'kedatangan'"
            :class="currentTab === 'kedatangan' ? 'text-sky-600 bg-sky-50 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'"
            class="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            Kedatangan
          </button>
        </nav>
      </div>

      <!-- User Profile & Logout -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-10 h-10 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center text-sm shrink-0">
            {{ currentUser.cabangNama.charAt(6) || 'C' }}
          </div>
          <div class="text-xs truncate">
            <p class="font-bold text-slate-800 truncate">{{ currentUser.cabangNama }}</p>
            <p class="text-slate-400 truncate">{{ currentUser.email }}</p>
          </div>
        </div>
        <button @click="logout" class="text-slate-400 hover:text-rose-600 p-1 transition-colors" title="Logout">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        </button>
      </div>
    </aside>

    <!-- Content Utama -->
    <main class="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-w-0">
      <!-- Top Banner -->
      <div class="bg-[#0277bd] text-white p-6 shrink-0 flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold tracking-wide">ASTRA DAIHATSU</h2>
          <p class="text-sm opacity-90 font-light mt-1">Cabang: {{ currentUser.cabangNama }}</p>
        </div>
        <span class="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
          USER ACTIVE: {{ currentUser.cabangNama.toUpperCase() }}
        </span>
      </div>

      <!-- VIEW 1: DATA INSPEKSI -->
      <div v-if="currentTab === 'data'" class="p-6 flex-1 flex flex-col overflow-y-auto">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-2xl font-bold text-slate-900">Data Inspeksi - {{ currentUser.cabangNama }}</h3>
            <p class="text-sm text-slate-500 mt-1">Klik pada baris data untuk melihat detail laporan inspeksi.</p>
          </div>
          <button class="bg-[#009688] hover:bg-[#00897b] text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export Excel
          </button>
        </div>

        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 mb-6">
          <div class="relative flex-1 min-w-[280px]">
            <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" placeholder="Cari nama, nopol, advisor..." class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500" />
          </div>
          <span class="bg-sky-100 text-sky-600 font-bold text-xs px-3 py-2 rounded-xl">
            Total Data: {{ filteredListData.length }}
          </span>
        </div>

        <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex-1">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#263b59] text-white text-xs font-bold uppercase tracking-wider">
                <th class="p-4">TANGGAL</th>
                <th class="p-4">CUSTOMER</th>
                <th class="p-4">NO. POLISI</th>
                <th class="p-4">ADVISOR</th>
                <th class="p-4">TOTAL</th>
                <th class="p-4 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr v-if="filteredListData.length === 0">
                <td colspan="6" class="py-12 text-center text-slate-400">Belum ada data inspeksi untuk cabang {{ currentUser.cabangNama }}.</td>
              </tr>
              <!-- Baris data dapat diklik untuk membuka modal detail -->
              <tr v-for="(item, index) in filteredListData" :key="index" @click="openDetail(item)" class="hover:bg-sky-50/50 cursor-pointer transition-colors">
                <td class="p-4 font-medium text-slate-600">{{ item.tanggal }}</td>
                <td class="p-4">
                  <div class="font-bold text-slate-900">{{ item.customer }}</div>
                  <div class="text-xs text-slate-400">{{ item.phone }}</div>
                </td>
                <td class="p-4">
                  <span class="bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-xl uppercase">
                    {{ item.nopol }}
                  </span>
                </td>
                <td class="p-4 text-slate-700 font-medium">{{ item.advisor }}</td>
                <td class="p-4 font-bold text-sky-600">Rp {{ item.total.toLocaleString('id-ID') }}</td>
                <td class="p-4 text-center" @click.stop>
                  <div class="flex items-center justify-center gap-2">
                    <button @click="editData(item)" class="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors" title="Edit Data">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button @click="hapusData(item)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus Data">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- VIEW 2: INPUT FORM -->
      <div v-if="currentTab === 'input'" class="p-6 flex-1 flex flex-col overflow-y-auto">
        <div class="mb-6 flex justify-between items-center">
          <div>
            <h3 class="text-2xl font-bold text-slate-900">{{ isEditing ? 'Edit Inspection Report' : 'Input Inspection Report' }}</h3>
            <p class="text-sm text-slate-500 mt-1">Perbarui data header, daftar jasa/sparepart, dan pilih mekanik bertugas.</p>
          </div>
          <span v-if="isEditing" class="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl">
            Mode Edit Aktif
          </span>
        </div>

        <div class="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Tanggal Pemeriksaan</label>
              <input type="text" v-model="form.tanggal" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Nama Customer</label>
              <input type="text" v-model="form.customer" placeholder="Nama customer" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Service Advisor</label>
              <select v-model="form.advisor" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 text-slate-700">
                <option value="" disabled>-- Pilih Service Advisor --</option>
                <option v-for="sa in currentAdvisors" :key="sa" :value="sa">{{ sa }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Nomor Telepon</label>
              <input type="text" v-model="form.phone" placeholder="08xxxxxxxxxx" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Nomor Polisi</label>
              <input type="text" v-model="form.nopol" placeholder="B 1234 XYZ" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 uppercase" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Rencana Penggantian</label>
              <input type="text" v-model="form.rencana" placeholder="Mis. 20 Nov 2026 / 5.000 km" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
            </div>
          </div>

          <hr class="border-slate-100 my-4" />

          <div>
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-4">Daftar Jasa & Sparepart</h4>
            
            <div class="space-y-3">
              <div v-for="(item, idx) in form.items" :key="idx" class="flex items-center gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-200">
                <span class="w-8 text-center text-sm font-bold text-slate-500">{{ idx + 1 }}</span>
                <input type="text" v-model="item.nama" placeholder="Nama Jasa / Sparepart" class="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sky-500" />
                <input type="number" v-model.number="item.qty" min="1" class="w-20 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-center focus:outline-none focus:border-sky-500" />
                <input type="number" v-model.number="item.harga" min="0" class="w-36 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-center focus:outline-none focus:border-sky-500" />
                <div class="w-28 text-right font-bold text-sm text-slate-800">
                  Rp {{ (item.qty * item.harga).toLocaleString('id-ID') }}
                </div>
                <button @click="removeItem(idx)" class="w-8 h-8 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            <div class="mt-4">
              <button @click="addItem" class="bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                Tambah Baris
              </button>
            </div>
          </div>

          <!-- Pilihan Mekanik (Internal, Tidak Masuk PDF) -->
          <div class="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4">
            <label class="block text-xs font-bold text-amber-800 uppercase mb-2">Pilih Mekanik Bertugas (Internal Cabang - Tidak Masuk PDF)</label>
            <select v-model="form.mekanik" class="w-full md:w-1/2 bg-white border border-amber-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500 text-slate-700">
              <option value="" disabled>-- Pilih Mekanik --</option>
              <option v-for="mek in currentMekanikList" :key="mek" :value="mek">{{ mek }}</option>
            </select>
          </div>

          <div class="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p class="text-xs font-bold text-slate-600 uppercase mb-1">Catatan</p>
              <p class="text-xs text-slate-500">Bawa kembali form ini & lakukan booking H-2 untuk mendapatkan diskon jasa 15%.</p>
            </div>
            <div class="text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
              <p class="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Keseluruhan</p>
              <p class="text-2xl font-black text-[#1d61e7] mt-0.5">Rp {{ hitungTotal.toLocaleString('id-ID') }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button @click="saveData" class="bg-[#1d61e7] hover:bg-[#1553cb] text-white text-xs font-semibold px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
              {{ isEditing ? 'Perbarui Data' : 'Simpan Data Cabang' }}
            </button>
            <button @click="resetForm" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-5 py-3 rounded-xl transition-colors">
              {{ isEditing ? 'Batal Edit' : 'Reset Form' }}
            </button>
          </div>
        </div>
      </div>

      <!-- VIEW 3: KEDATANGAN PELANGGAN -->
      <div v-if="currentTab === 'kedatangan'" class="p-6 flex-1 flex flex-col overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-2xl font-bold text-slate-900">Kedatangan Pelanggan - {{ currentUser.cabangNama }}</h3>
            <p class="text-sm text-slate-500 mt-1">Pantau persentase kedatangan harian khusus cabang {{ currentUser.cabangNama }}.</p>
          </div>
          <div class="flex items-center gap-3">
            <input type="text" v-model="filterTanggalKedatangan" class="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-sky-500 w-36 text-center font-semibold" />
            <button @click="tambahKehadiranModal" class="bg-[#1d61e7] hover:bg-[#1553cb] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Tambah Kehadiran
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
            <div>
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL INSPECTION REPORT</p>
              <p class="text-2xl font-extrabold text-slate-900 mt-1">{{ totalInspectionCount }} <span class="text-xs font-normal text-slate-400">orang</span></p>
            </div>
            <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
            <div>
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL HADIR</p>
              <p class="text-2xl font-extrabold text-emerald-500 mt-1">{{ totalHadirCount }} <span class="text-xs font-normal text-slate-400">orang</span></p>
            </div>
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
            <div>
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PERSENTASE KEDATANGAN</p>
              <p class="text-2xl font-extrabold text-[#1d61e7] mt-1">{{ persentaseKedatangan }}%</p>
            </div>
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#1d61e7] flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/></svg>
            </div>
          </div>
        </div>

        <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex-1 bg-white">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#263b59] text-white text-xs font-bold uppercase tracking-wider">
                <th class="p-4">NO. POLISI</th>
                <th class="p-4">TANGGAL</th>
                <th class="p-4">KEDATANGAN</th>
                <th class="p-4 text-center">AKSI DETAIL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredKedatangan.length === 0">
                <td colspan="4" class="py-16 text-center text-sm text-slate-400">Belum ada data kedatangan untuk cabang {{ currentUser.cabangNama }}.</td>
              </tr>
              <tr v-for="(row, i) in filteredKedatangan" :key="i" class="border-t border-slate-100 hover:bg-slate-50 transition-colors text-sm">
                <td class="p-4 font-bold text-slate-900 uppercase">{{ row.nopol }}</td>
                <td class="p-4 text-slate-600">{{ row.tanggal }}</td>
                <td class="p-4">
                  <button @click="toggleHadir(row)" :class="row.hadir ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'" class="px-3 py-1 rounded-full text-xs font-semibold">
                    {{ row.hadir ? 'Hadir' : 'Belum Hadir' }}
                  </button>
                </td>
                <td class="p-4 text-center">
                  <button @click="hapusKedatangan(row)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- MODAL DETAIL INSPECTION REPORT (POP-UP) -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Header Modal -->
        <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 class="text-xl font-black text-slate-900">Detail Inspection Report</h3>
            <span class="inline-block bg-sky-50 text-sky-600 border border-sky-200 text-xs font-bold px-3 py-1 rounded-xl mt-1">
              {{ selectedItem.idReport || 'INS-627030' }}
            </span>
          </div>
          <button @click="closeDetail" class="w-9 h-9 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full flex items-center justify-center transition-colors">
            ✕
          </button>
        </div>

        <!-- Body Modal -->
        <div class="p-6 overflow-y-auto space-y-6">
          <!-- Card Info Header -->
          <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase">TANGGAL PEMERIKSAAN</p>
              <p class="font-bold text-slate-800 mt-0.5">{{ selectedItem.tanggal }}</p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase">NAMA CUSTOMER</p>
              <p class="font-bold text-slate-800 mt-0.5">{{ selectedItem.customer }}</p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase">SERVICE ADVISOR</p>
              <p class="font-bold text-slate-800 mt-0.5">{{ selectedItem.advisor }}</p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase">NOMOR TELEPON</p>
              <p class="font-bold text-slate-800 mt-0.5">{{ selectedItem.phone }}</p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase">NOMOR POLISI</p>
              <p class="inline-block bg-white border border-slate-200 px-3 py-1 rounded-xl font-bold text-slate-900 uppercase mt-0.5">{{ selectedItem.nopol }}</p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-slate-400 uppercase">RENCANA PENGGANTIAN</p>
              <p class="font-bold text-slate-800 mt-0.5">{{ selectedItem.rencana || '-' }}</p>
            </div>
          </div>

          <!-- Tabel Jasa / Sparepart -->
          <div class="border border-slate-200 rounded-2xl overflow-hidden">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#263b59] text-white text-xs font-bold uppercase tracking-wider">
                  <th class="p-3.5 w-16 text-center">NO</th>
                  <th class="p-3.5">JASA / SPAREPART</th>
                  <th class="p-3.5 text-center w-20">QTY</th>
                  <th class="p-3.5 text-right w-36">HARGA SATUAN</th>
                  <th class="p-3.5 text-right w-36">TOTAL</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm">
                <tr v-for="(part, idx) in selectedItem.items" :key="idx" class="hover:bg-slate-50">
                  <td class="p-3.5 text-center font-bold text-slate-500">{{ idx + 1 }}</td>
                  <td class="p-3.5 font-medium text-slate-800">{{ part.nama }}</td>
                  <td class="p-3.5 text-center text-slate-600">{{ part.qty }}</td>
                  <td class="p-3.5 text-right text-slate-600">Rp {{ part.harga.toLocaleString('id-ID') }}</td>
                  <td class="p-3.5 text-right font-bold text-slate-900">Rp {{ (part.qty * part.harga).toLocaleString('id-ID') }}</td>
                </tr>
                <tr class="bg-slate-50/80 font-bold">
                  <td colspan="4" class="p-3.5 text-right text-slate-600 uppercase text-xs">Total Keseluruhan</td>
                  <td class="p-3.5 text-right text-sky-600 text-base">Rp {{ selectedItem.total.toLocaleString('id-ID') }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Catatan Diskon -->
          <div class="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
            <svg class="w-6 h-6 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p class="text-xs text-amber-800 font-medium">Bawa kembali form ini & lakukan booking H-2 untuk mendapatkan diskon jasa 15%.</p>
          </div>
        </div>

        <!-- Footer Modal -->
        <div class="p-5 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
          <button @click="closeDetail" class="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors">
            Tutup
          </button>
          <button @click="exportPdf(selectedItem)" class="px-5 py-2.5 bg-[#1d61e7] hover:bg-[#1553cb] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentUser = ref(null)
const currentTab = ref('data')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isEditing = ref(false)
const editingIndex = ref(null)

// State Modal Detail
const showDetailModal = ref(false)
const selectedItem = ref({})

const usersDatabase = [
  {
    email: 'ircitraraya@gmail.com',
    password: 'Citra123',
    cabangNama: 'Astra Daihatsu Citra Raya',
    cabangId: 'citra-raya',
    alamat: 'Jl. Citra Raya Boulevard BLOK S01 - S02, Ciakar, Kec. Panongan, Kabupaten Tangerang, Banten 15710',
    advisors: ['Achmad Firdaus : 0857-7690-6430', 'Fatha Arighi : 0895-2211-3325'],
    mekanikList: ['Joko Santoso', 'Rian Hidayat', 'Ahmad Dani']
  },
  {
    email: 'irserang@gmail.com',
    password: 'Serang123',
    cabangNama: 'Astra Daihatsu Serang',
    cabangId: 'serang',
    alamat: 'Jl. Jend. Sudirman No.45, RT.1/RW.1, Panancangan, Kec. Cipocok Jaya, Kota Serang, Banten 42124',
    advisors: ['Ira Mutiara S Situmorang : 081285122559', 'Firman Faturahman : 085173455151'],
    mekanikList: ['Dedi Kurniawan', 'Budi Setiawan', 'Sandi Pratama']
  }
]

const handleLogin = () => {
  const found = usersDatabase.find(
    u => u.email.toLowerCase() === email.value.trim().toLowerCase() && u.password === password.value
  )
  if (found) {
    errorMessage.value = ''
    currentUser.value = found
  } else {
    errorMessage.value = 'Email atau Password salah! Periksa kembali kredensial Anda.'
  }
}

const logout = () => {
  currentUser.value = null
  email.value = ''
  password.value = ''
  isEditing.value = false
  showDetailModal.value = false
}

const getTodayDateStr = () => {
  const d = new Date()
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const filterTanggalKedatangan = ref(getTodayDateStr())

const listData = ref([
  { 
    idReport: 'INS-627030',
    cabangId: 'citra-raya', 
    tanggal: '06 Nov 2026', 
    customer: 'Tobat Martin', 
    phone: '0811503495', 
    nopol: 'A1159VU', 
    advisor: 'Achmad Firdaus : 0857-7690-6430', 
    total: 2050001, 
    rencana: '-',
    items: [
      { nama: 'Jasa Gt Wiring', qty: 1, harga: 1 },
      { nama: 'Wiring engine', qty: 1, harga: 2050000 }
    ] 
  },
  { 
    idReport: 'INS-889102',
    cabangId: 'serang', 
    tanggal: '06 Nov 2026', 
    customer: 'BUDI SANTOSO', 
    phone: '081299887766', 
    nopol: 'A 9999 XX', 
    advisor: 'Ira Mutiara S Situmorang : 081285122559', 
    total: 1500000, 
    rencana: '20 Nov 2026 / 5.000 km',
    items: [
      { nama: 'Tune Up Mesin', qty: 1, harga: 1500000 }
    ] 
  }
])

const listKedatangan = ref([
  { cabangId: 'citra-raya', nopol: 'A1159VU', tanggal: getTodayDateStr(), hadir: true },
  { cabangId: 'serang', nopol: 'A 9999 XX', tanggal: getTodayDateStr(), hadir: true }
])

const filteredListData = computed(() => {
  if (!currentUser.value) return []
  return listData.value.filter(item => item.cabangId === currentUser.value.cabangId)
})

const filteredKedatangan = computed(() => {
  if (!currentUser.value) return []
  return listKedatangan.value.filter(item => item.cabangId === currentUser.value.cabangId)
})

const currentAdvisors = computed(() => currentUser.value ? currentUser.value.advisors : [])
const currentMekanikList = computed(() => currentUser.value ? currentUser.value.mekanikList : [])

const totalInspectionCount = computed(() => filteredKedatangan.value.length)
const totalHadirCount = computed(() => filteredKedatangan.value.filter(item => item.hadir).length)
const persentaseKedatangan = computed(() => {
  if (totalInspectionCount.value === 0) return 0
  return Math.round((totalHadirCount.value / totalInspectionCount.value) * 100)
})

const openDetail = (item) => {
  selectedItem.value = item
  showDetailModal.value = true
}

const closeDetail = () => {
  showDetailModal.value = false
}

const exportPdf = (item) => {
  alert(`Mendownload laporan PDF untuk Customer: ${item.customer} (${item.idReport})`)
}

const tambahKehadiranModal = () => {
  const inputNopol = prompt(`[${currentUser.value.cabangNama}] Masukkan Nomor Polisi Customer:`)
  if (inputNopol && inputNopol.trim() !== '') {
    listKedatangan.value.push({
      cabangId: currentUser.value.cabangId,
      nopol: inputNopol.trim().toUpperCase(),
      tanggal: filterTanggalKedatangan.value,
      hadir: true
    })
  }
}

const toggleHadir = (row) => {
  row.hadir = !row.hadir
}

const hapusKedatangan = (row) => {
  const idx = listKedatangan.value.indexOf(row)
  if (idx !== -1 && confirm('Hapus data kedatangan ini?')) {
    listKedatangan.value.splice(idx, 1)
  }
}

const hapusData = (item) => {
  const idx = listData.value.indexOf(item)
  if (idx !== -1 && confirm('Hapus data inspeksi ini?')) {
    listData.value.splice(idx, 1)
  }
}

const initialForm = {
  tanggal: getTodayDateStr(),
  customer: '',
  advisor: '',
  phone: '',
  nopol: '',
  rencana: '',
  mekanik: '',
  items: [{ nama: '', qty: 1, harga: 0 }]
}

const form = ref(JSON.parse(JSON.stringify(initialForm)))

const addItem = () => {
  form.value.items.push({ nama: '', qty: 1, harga: 0 })
}

const removeItem = (index) => {
  if (form.value.items.length > 1) {
    form.value.items.splice(index, 1)
  }
}

const hitungTotal = computed(() => {
  return form.value.items.reduce((sum, item) => sum + (item.qty * item.harga), 0)
})

const resetForm = () => {
  form.value = JSON.parse(JSON.stringify(initialForm))
  isEditing.value = false
  editingIndex.value = null
}

const editData = (item) => {
  isEditing.value = true
  editingIndex.value = listData.value.indexOf(item)
  form.value = {
    tanggal: item.tanggal,
    customer: item.customer,
    advisor: item.advisor,
    phone: item.phone,
    nopol: item.nopol,
    rencana: item.rencana || '-',
    mekanik: item.mekanik || '',
    items: item.items ? JSON.parse(JSON.stringify(item.items)) : [{ nama: '', qty: 1, harga: 0 }]
  }
  currentTab.value = 'input'
}

const saveData = () => {
  if (!form.value.customer || !form.value.nopol) {
    alert('Mohon lengkapi Nama Customer dan Nomor Polisi!')
    return
  }

  const generatedId = `INS-${Math.floor(100000 + Math.random() * 900000)}`

  const payload = {
    idReport: isEditing.value ? listData.value[editingIndex.value].idReport : generatedId,
    cabangId: currentUser.value.cabangId,
    tanggal: form.value.tanggal,
    customer: form.value.customer,
    phone: form.value.phone,
    nopol: form.value.nopol,
    advisor: form.value.advisor,
    rencana: form.value.rencana || '-',
    mekanik: form.value.mekanik,
    total: hitungTotal.value,
    items: JSON.parse(JSON.stringify(form.value.items))
  }

  if (isEditing.value && editingIndex.value !== null) {
    listData.value[editingIndex.value] = payload
    alert(`Data inspection report berhasil diperbarui untuk ${currentUser.value.cabangNama}!`)
  } else {
    listData.value.push(payload)
    listKedatangan.value.push({
      cabangId: currentUser.value.cabangId,
      nopol: form.value.nopol,
      tanggal: form.value.tanggal,
      hadir: true
    })
    alert(`Data inspection report berhasil disimpan untuk ${currentUser.value.cabangNama}!`)
  }

  resetForm()
  currentTab.value = 'data'
}
</script>