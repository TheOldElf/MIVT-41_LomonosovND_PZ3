const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config(); // Подключаем dotenv для работы с переменными окружения

// Сериализация пользователя (сохранение в сессии)
passport.serializeUser((user, done) => {
    done(null, user);
});

// Десериализация пользователя (получение из сессии)
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Настройка стратегии Google OAuth2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // Используем переменные окружения
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/callback",
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Настройка стратегии GitHub OAuth
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, // Используем переменные окружения
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Здесь можно добавить логику поиска или создания пользователя в базе данных
    return done(null, profile);
}));

module.exports = passport;