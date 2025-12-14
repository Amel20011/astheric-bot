// Di file ini Anda menempatkan semua fungsi pengiriman pesan interaktif

async function sendMainMenu(sock, chatId) {
  await sock.sendMessage(chatId, {
    text: `╭─── 🎀 ASTHERIC BOT MENU 🎀 ───╮
│ Bot : Astheric
│ User : 🌸 @${chatId.split('@')[0]}
│ Mode : Multi Device
╰─────────────────────────────╯

🌸 MAIN MENU
♡ .menu       → Tampilkan menu
♡ .allmenu    → Semua command
♡ .info       → Info bot
♡ .ping       → Cek bot aktif
♡ .profile    → Cek profil user
♡ .daftar     → Daftar user baru
♡ .rules      → Peraturan bot
♡ .donasi     → Info donasi / support`,
    footer: 'Astheric Bot 🌸',
    buttons: [
      { buttonId: 'group_menu', buttonText: { displayText: 'Group Menu 💞' }, type: 1 },
      { buttonId: 'admin_menu', buttonText: { displayText: 'Admin Menu 🛡' }, type: 1 },
      { buttonId: 'owner_menu', buttonText: { displayText: 'Owner Menu 💗' }, type: 1 },
      { buttonId: 'all_commands', buttonText: { displayText: 'All Commands ✨' }, type: 1 }
    ],
    headerType: 1
  });
}

async function sendGroupMenu(sock, chatId) {
  await sock.sendMessage(chatId, {
    text: `💞 GROUP MENU
♡ .antilink on/off     → Blokir link otomatis
♡ .welcome on/off      → Nyalakan pesan welcome
♡ .goodbye on/off      → Nyalakan pesan keluar
♡ .group open/close    → Buka/tutup grup
♡ .add <nomor>         → Tambah member
♡ .kick <nomor>        → Keluarkan member
♡ .promote <nomor>     → Jadikan admin
♡ .demote <nomor>      → Turunkan admin
♡ .tagall              → Tag semua member
♡ .mute on/off         → Heningkan grup
♡ .unmute              → Buka hening`,
    footer: 'Astheric Bot 🌸',
    buttons: [
      { buttonId: 'main_menu', buttonText: { displayText: 'Back to Main Menu 🌸' }, type: 1 }
    ],
    headerType: 1
  });
}

async function sendAdminMenu(sock, chatId) {
  await sock.sendMessage(chatId, {
    text: `🛡 ADMIN MENU
♡ .del <reply>         → Hapus pesan
♡ .warn <nomor>        → Beri peringatan
♡ .stickers            → Buat sticker dari gambar
♡ .setdesc <teks>      → Ganti deskripsi grup
♡ .setname <teks>      → Ganti nama grup
♡ .hidetag             → Kirim pesan tanpa tag terlihat`,
    footer: 'Astheric Bot 🌸',
    buttons: [
      { buttonId: 'main_menu', buttonText: { displayText: 'Back to Main Menu 🌸' }, type: 1 }
    ],
    headerType: 1
  });
}

async function sendOwnerMenu(sock, chatId) {
  await sock.sendMessage(chatId, {
    text: `💗 OWNER MENU
♡ .owner               → Info owner
♡ .broadcast <pesan>   → Kirim ke semua user
♡ .eval <kode>         → Jalankan kode JS
♡ .restart             → Restart bot
♡ .setprefix <prefix>  → Ganti prefix bot
♡ .block <nomor>       → Block user
♡ .unblock <nomor>     → Unblock user
♡ .setppbot            → Ganti foto profil bot
♡ .setwm <teks>        → Set watermark / footer
♡ .setmenu <teks>      → Set tampilan menu`,
    footer: 'Astheric Bot 🌸',
    buttons: [
      { buttonId: 'main_menu', buttonText: { displayText: 'Back to Main Menu 🌸' }, type: 1 }
    ],
    headerType: 1
  });
}

async function sendRegistrationPrompt(sock, chatId, userNumber) {
  await sock.sendMessage(chatId, {
    text: `🌸 Hai @${userNumber} ✨\nKamu belum terdaftar di sistemku 💗\nKalau ingin pakai aku, klik tombol di bawah ya 🌷`,
    mentions: [`${userNumber}@s.whatsapp.net`],
    footer: 'Astheric Bot 🌸',
    buttons: [
      { buttonId: 'daftar_pribadi', buttonText: { displayText: 'Daftar Pribadi 🌷' }, type: 1 }
    ],
    headerType: 1
  });
}

async function sendWelcomeMessage(sock, groupId, userNumber) {
  await sock.sendMessage(groupId, {
    text: `✨ Hello @${userNumber} 💖\nAku Astheric 🌷 yang akan menyambutmu sekarang 💗\nOh iya, kamu mau pakai aku? Klik salah satu tombol di bawah 🌸`,
    mentions: [`${userNumber}@s.whatsapp.net`],
    footer: 'Astheric Bot 🌸',
    buttons: [
      { buttonId: 'daftar', buttonText: { displayText: 'Daftar 🌸' }, type: 1 },
      { buttonId: 'owner', buttonText: { displayText: 'Owner 💫' }, type: 1 }
    ],
    headerType: 1
  });
}

module.exports = {
  menuSender: {
    sendMainMenu,
    sendGroupMenu,
    sendAdminMenu,
    sendOwnerMenu,
    sendRegistrationPrompt,
    sendWelcomeMessage,
  }
};
