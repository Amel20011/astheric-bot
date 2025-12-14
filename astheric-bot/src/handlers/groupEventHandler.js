const { menuSender } = require('../menus/menuSender');

async function handleGroupEvent(sock, update) {
  const { id: groupId, participants, action } = update;
  
  if (action === 'add') {
    for (const participant of participants) {
      // Kirim pesan selamat datang ke member baru
      await menuSender.sendWelcomeMessage(sock, groupId, participant.split('@')[0]);
    }
  }
  // Tambahkan penanganan untuk 'remove', 'promote', 'demote' jika perlu
}

module.exports = { handleGroupEvent };
