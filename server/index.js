const express = require('express');
const verifyProof = require('../utils/verifyProof');
const {keccak256} = require("ethereum-cryptography/keccak");
const {utf8ToBytes, bytesToHex} = require("ethereum-cryptography/utils");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'a8c425a3115617326b95149ce3681cadffffe75f9d301d4eaf067c19b4115020';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {proof, gift} = req.body;
  const leaf = bytesToHex(keccak256(utf8ToBytes(gift)));
  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
