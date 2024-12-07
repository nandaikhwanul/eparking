import { Sequelize } from "sequelize";

const db = new Sequelize('postgresql://postgres.xxytuxqqiobfwqotkqpb:pontianak88@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// Test koneksi
(async () => {
    try {
        await db.authenticate();
        console.log('Koneksi database berhasil.');
    } catch (error) {
        console.error('Gagal koneksi ke database:', error);
    }
})();

export default db;