const fetch = require("node-fetch");

const serviceDomain = process.env.NEXT_PUBLIC_SERVICE_DOMAIN;
const url = `https://${NEXT_PUBLIC_SERVICE_DOMAIN}/path-to-api`; // APIのパスを適切に設定してください。

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
