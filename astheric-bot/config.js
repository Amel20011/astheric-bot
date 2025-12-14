require('dotenv').config();

module.exports = {
  // Konversi nomor owner ke format yang benar jika hanya angka
  ownerNumber: process.env.OWNER_NUMBER.includes('@s.whatsapp.net') 
    ? process.env.OWNER_NUMBER 
    : `${process.env.OWNER_NUMBER}@s.whatsapp.net`,
  prefix: process.env.PREFIX || '.',
  mongoDbUri: process.env.MONGO_DB_URI,
};
