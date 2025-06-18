# 💸 $BOND
A centralized cryptocurrency for fun, experimentation, and learning — built with Node.js, TypeScript, Express, and SQLite.

## Overview

$BOND is a playful and educational blockchain implementation that simulates real-world crypto mechanics without decentralization headaches. It features a RESTful API for interacting with the blockchain, submitting transactions, mining blocks, and querying wallet balances. The project uses a centralized SQLite database to persist the blockchain. The mempool is stored in memory.

### 🛠 Features

- **Blockchain Core:** Each block includes signed transactions, a timestamp, a nonce, and a hash pointer to the previous block.
- **Proof of Work:** Configurable mining difficulty (default: 16 leading zero bits in binary).
- **ECDSA Signatures:** Transactions are signed with `secp256k1`. Sender addresses are SHA-256 hashes of the public key.
- **In-Memory Mempool:** Stores pending transactions until a block is mined.
- **Genesis Block:** Awards 42 $BOND to a hardcoded address on first run.
- **Wallet Tools:** CLI utilities to generate keys, sign txs, and mine blocks.
- **REST API:** Full set of endpoints for blocks, balances, and transactions.

## Technical Details

### Blockchain

- Each block is an instance of [`Block`](src/blockchain/block.ts), containing:
  - `height`, `timestamp`, `transactions`, `previous_hash`, `nonce`, and `hash`.
- Block hash is computed as:
	- `sha256(height + timestamp + JSON.stringify(transactions) + previous_hash + nonce)`
- Proof of Work: The block hash must have `DIFFICULTY` leading zero bits (see [`DIFFICULTY`](src/blockchain/index.ts)).

### Transactions

- Transactions are objects with:
- `sender`, `recipient`, `amount`, `timestamp`, `message`, `signature`, `publicKey`, and `txid`.
- The sender address is the SHA-256 hash of the public key.
- Transactions are signed using ECDSA (secp256k1). The signature covers all transaction fields except `signature` and `txid`.
- Signature verification is handled by [`verifySignature`](src/utils/crypto.util.ts).

### Mempool

- Pending transactions are stored in-memory in [`mempool`](src/blockchain/mempool.ts).
- Transactions are added to the mempool after signature and balance checks.

### Database

- SQLite is used for persistent storage.
- The blockchain is stored in a single `blockchain` table (see schema in [`src/db/index.ts`](src/db/index.ts)).
- Genesis block is created automatically if the chain is empty.

### REST API

Implemented in [`src/routes/blockchain.route.ts`](src/routes/blockchain.route.ts):

### CLI Tools

- [`tools/generateWallet.ts`](tools/generateWallet.ts): Generate a new ECDSA wallet (public/private key pair).
- [`tools/makeTransaction.ts`](tools/makeTransaction.ts): Create and sign a transaction interactively.
- [`tools/miner.ts`](tools/miner.ts): Mine a block by finding a valid nonce.

## Getting Started

1. **Install dependencies:**
 ```sh
npm install
 ```

2. **Build the project**
```sh
npm run build
```

3. **Start the server**
```sh
npm start
```

4. **Generate a wallet**
```sh
ts-node tools/generateWallet.ts
```

5. **Create and sign a transaction**
```sh
ts-node tools/makeTransaction.ts
```

6. **Mine a block**
```sh
ts-node tools/miner.ts
```

## API

### GET /

Shows the welcome page

### GET /blocks

Returns the latest block in the chain.

**Response**
```json
{
  "height": 1,
  "timestamp": "...",
  "transactions": [],
  "previous_hash": "9df7...",
  "nonce": 4714,
  "hash": "0000..."
}
```

### POST /blocks

Submit a new block.

**Request Body**
```json
{
  "height": 1,
  "timestamp": "...",
  "transactions": [],
  "previous_hash": "9df7...",
  "nonce": 4714,
  "hash": "0000..."
}
```

**Response**
```json
{
  "status": "OK"
}
```

### GET /transactions

Get a list of all transactions in the mempool.

**Response**
```json
[
  {
    "txid": "fc90...",
    "sender": "c6c8...",
    "recipient": "...",
    "amount": 0.4,
    "timestamp": "2025-06-17T22:43:30.036Z",
    "message": "Hello world!",
    "signature": "30450...",
    "publicKey": "-----BEGIN PUB..."
  }
]
```

### POST /transactions

Add a new transaction to mempool.

**Request**
```json
{
  "sender": "c6c81...",
  "recipient": "...",
  "amount": 0.4,
  "timestamp": "2025-06-17T22:43:30.036Z",
  "message": "...",
  "signature": "3045...",
  "publicKey": "-----BEGIN PUB..."
}
```

**Response**
```json
{
  "status": "OK"
}
```

### POST /balance/`:address`

Get the balance of a wallet

**Response**
```json
{
  "balance": 41.2
}
```

## Security Notes
- All state is centralized in a single SQLite database.
- There is no peer-to-peer networking on consensus.