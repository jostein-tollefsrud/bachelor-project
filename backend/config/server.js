module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS", [
      "YdYR4z+zO6VwsnXkZPNYzw==",
      "sPNAWAuT02cEWHsgolMYIw==",
      "Ht5uy+Ynwp7SAXDxIjqZXw==",
      "r1iyf2DAd92heADNsyueGQ==",
    ]),
  },
});
