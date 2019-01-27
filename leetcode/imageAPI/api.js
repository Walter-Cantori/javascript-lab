const Unsplash = require('unsplash-js').default;
const fetch = require('node-fetch');

const unsplash = new Unsplash({
  applicationId: "94c0dd70b086f90fff44e0fd1709ad08337ff2cf81980db689df5ee592c215df",
  secret: "b7b5e50c5c8fffc843617f196a029fd651f1174b30a3a4f4ca890c772c37ad30",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

unsplash.search.photos("dogs", 1)
  .then(resp => console.log(resp))