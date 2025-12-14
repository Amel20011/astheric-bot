const mongoose = require('mongoose');
const config = require('../../config');

// Definisikan schema user
const userSchema = new mongoose.Schema({
  _id: String, // Nomor WhatsApp user
  name: { type: String, default: 'User' },
  registeredAt: { type: Date, default: Date.now },
  warnings: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

async function connectDB() {
  try {
    await mongoose.connect(config.mongoDbUri);
    console.log('✅ Berhasil terhubung ke MongoDB.');
  } catch (err) {
    console.error('❌ Gagal terhubung ke Database:', err);
    process.exit(1); // Hentikan proses jika koneksi gagal
  }
}

async function isUserRegistered(userId) {
  const user = await User.findById(userId);
  return !!user; // Mengembalikan true jika user ada, false jika tidak
}

async function registerUser(userId, name) {
  // Cek apakah user sudah ada
  if (await isUserRegistered(userId)) {
    return false; // Tidak mendaftarkan jika sudah ada
  }
  const newUser = new User({ _id: userId, name: name || 'User' });
  await newUser.save();
  return true;
}

module.exports = {
  connectDB,
  isUserRegistered,
  registerUser,
  User, // Export model jika perlu di tempat lain
};
