import { Sequelize } from "sequelize";

const db = new Sequelize('postgresql://postgres.xxytuxqqiobfwqotkqpb:pontianak88@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
        ],
        max: 5
    }
});

// Test koneksi
(async () => {
    try {
        await db.authenticate();
        console.log('Koneksi database berhasil.');
    } catch (error) {
        console.error('Gagal koneksi ke database:', error);
        process.exit(1); // Keluar dari aplikasi jika koneksi gagal
    }
})();

export default db;