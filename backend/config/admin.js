module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bceed4b71d47a234dd63e75ef5c5c4ec'),
  },
});
