const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const {keccak256} = require("ethereum-cryptography/keccak");
const {bytesToHex, utf8ToBytes} = require("ethereum-cryptography/utils");

const serverUrl = 'http://localhost:1225';

async function main() {
  const randomNumber = Math.floor(Math.random() * niceList.length);
  const hashes = niceList.map(gift => bytesToHex(keccak256(utf8ToBytes(gift))));
  const merkleTree = new MerkleTree(hashes);
  const proof = merkleTree.getProof(randomNumber);
  const root = merkleTree.getRoot();
  console.log('The root is ', root);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    gift: niceList[randomNumber],
    proof
  });

  console.log({ gift });
}

main();
