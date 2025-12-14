const { menuSender } = require('../menus/menuSender');
const { isUserRegistered } = require('../database/db');
const config = require('../../config');

async function handleMessage(sock, msg) {
  const from = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid; // Untuk grup
  const messageType = Object.keys(msg.message)[0];
  const isGroup = from.endsWith('@g.us');

  // Abaikan pesan dari bot itu sendiri
  if (msg.key.fromMe) return;

  // --- Penanganan Respon Button ---
  if (msg.message.buttonsResponseMessage) {
    const selectedButtonId = msg.message.buttonsResponseMessage.selectedButtonId;
    switch (selectedButtonId) {
      case 'main_menu':
        return menuSender.sendMainMenu(sock, from);
      case 'group_menu':
        return menuSender.sendGroupMenu(sock, from);
      case 'admin_menu':
        return menuSender.sendAdminMenu(sock, from);
      case 'owner_menu':
        return menuSender.sendOwnerMenu(sock, from);
      case 'daftar':
      case 'daftar_pribadi':
        return menuSender.sendRegistrationPrompt(sock, from, sender.split('@')[0]);
      case 'owner':
        return sock.sendMessage(from, { text: `Nomor Owner: wa.me/${config.ownerNumber.split('@')[0]}` });
      // Tambahkan case untuk button lainnya
    }
    return;
  }

  // --- Penanganan Pesan Teks (Command) ---
  if (messageType === 'conversation' || messageType === 'extendedTextMessage') {
    const commandText = (msg.message.conversation || msg.message.extendedTextMessage.text).toLowerCase().trim();
    
    // Cek registrasi untuk command yang memerlukannya
    if (!await isUserRegistered(sender) && !commandText.startsWith(`${config.prefix}daftar`)) {
      return menuSender.sendRegistrationPrompt(sock, from, sender.split('@')[0]);
    }

    switch (commandText) {
      case `${config.prefix}menu`:
        return menuSender.sendMainMenu(sock, from);
      // Tambahkan command lainnya di sini
    }
  }
}

module.exports = { handleMessage };
