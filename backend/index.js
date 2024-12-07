import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import DosenRoute from "./routes/DosenRoute.js"

dotenv.config();

const app = express();

// Uncomment ini untuk sinkronisasi database
(async () => {
    await db.sync(); // Memastikan semua model tersinkronisasi, termasuk Dosen
})();

app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://yourdomain.com'  // Ganti dengan domain produksi
        : 'http://localhost:3000'
}));

app.use(express.json());

// Middleware untuk verifikasi JWT
app.use((req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SESS_SECRET);
            req.user = decoded;
        } catch (error) {
            console.error('JWT verification failed:', error);
        }
    }
    next();
});

app.use(UserRoute);
app.use(AuthRoute);
app.use(DosenRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server berjalan di port ' + (process.env.PORT || 5000));
});
