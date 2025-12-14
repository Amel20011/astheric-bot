const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const P = require('pino');

// Import modules
const config = require('./config');
const { handleMessage } = require('./src/handlers/messageHandler');
const { handleGroupEvent } = require('./src/handlers/groupEventHandler');
const { connectDB } = require('./src/database/db');

const SESSIONS_FOLDER = path.join(__dirname, 'sessions');

// Buat folder sessions jika belum ada
if (!fs.existsSync(SESSIONS_FOLDER)) {
  fs.mkdirSync(SESSIONS_FOLDER);
}

async function startBot() {
  console.log('🌸 Menghubungkan ke database...');
  await connectDB();
  
  const { state, saveCreds } = await useMultiFileAuthState(SESSIONS_FOLDER);
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: 'silent' })
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = (new Boom(lastDisconnect?.error))?.output.statusCode !== DisconnectReason.loggedOut;
      console.log('🔴 Koneksi terputus karena ', lastDisconnect.error, ', mencoba hubungkan kembali ', shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ Bot Berhasil Terhubung!');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  // Handler untuk pesan masuk
  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message) return;
    await handleMessage(sock, msg);
  });

  // Handler untuk event grup
  sock.ev.on('group-participants.update', async (update) => {
    await handleGroupEvent(sock, update);
  });
}

startBot();
