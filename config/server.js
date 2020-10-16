module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '3f3ac0e9bf4d54fec4dce043fa6ffb15'),
    },
  },
});
