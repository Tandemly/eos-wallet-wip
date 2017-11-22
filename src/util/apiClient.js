import moment from "moment";
import { merge, uniq, map, flatMap } from "lodash";
import { Buffer } from "buffer";
import eos from "eosjs";

const { json, ecc, api, Fcbuffer } = eos.modules;

// Required at front of all transactions.
// NOTE: This is a default of 64 '0's, even though it's not implemented in eosd yet
const chainId = new Buffer("00".repeat(32), "hex");

const eosEndpoint =
  process.env.NODE_ENV === "test"
    ? process.env.REACT_APP_EOSD_TESTS_URI
    : process.env.REACT_APP_EOSD_URI;

const apiEndpoint =
  process.env.NODE_ENV === "test"
    ? process.env.REACT_APP_API_TESTS_URI
    : process.env.REACT_APP_API_URI;

const authHeader = {
  Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
};

const defaultOptions = {
  method: "GET",
  headers: {
    "Content-type": "application/json"
  }
};

const defaultAPIOptions = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    ...authHeader
  }
};
// Grab the correct, sorted sceope from the list of messages
// intended for a transaction
const getScope = messages =>
  uniq(
    flatMap(messages, msg => [
      msg.code,
      ...map(msg.authorization, auth => auth.account)
    ])
  ).sort();

const rejectBadResponse = (response: Response): mixed => {
  response.ok || Promise.reject(response);
};

const request = async (
  path: string,
  options: mixed = {},
  mergeDefaults: boolean = true
) => {
  const opts = mergeDefaults ? merge({}, defaultOptions, options) : options;
  try {
    const resp = await fetch(path, opts);
    console.log("<resp>", resp);
    await rejectBadResponse(resp);
    // only attempt to parse JSON if proper content-type
    if (resp.headers && resp.headers.get("content-type").indexOf("json") > -1)
      return resp.json();
    return resp.text();
  } catch (error) {
    console.log(error);
    if (typeof error === "string") {
      return Promise.reject(error);
    }
    const data =
      error.headers && error.headers.get("content-type").indexOf("json") > -1
        ? await error.json()
        : await error.text();
    return Promise.reject(data);
  }
};

const configureClient = (target, opts = {}) => {
  if (!opts.keyProvider)
    throw new Error(`api client connection needs a keyProvider`);

  const eosNode = eos.Testnet({
    keyProvider: opts.keyProvider,
    httpEndpoint: eosEndpoint,
    debug: process.env.NODE_ENV !== "production",
    broadcast: false
  });

  return Object.assign(target, {
    keyProvider: opts.keyProvider,
    eos: eosNode
  });
};

class APIClient {
  constructor(opts) {
    configureClient(this, opts);
    this.structs = this.eos.fc.structs;
  }

  setKeyProvider(keyProvider) {
    this.keyProvider = keyProvider;
    console.log("--> set keyProvider:", this.keyProvider);
  }

  async get(path, opts = {}) {
    const options = Object.assign({}, defaultAPIOptions, opts);
    return await request(`${apiEndpoint}${path}`, options);
  }

  async post(path, data, opts = {}) {
    let { scope, messages } = data;

    if (!messages) {
      throw new Error("APIClient.post() data missing `messages` property");
    }
    if (!Array.isArray(messages)) {
      throw new Error(
        "APIClient.post() messages should be an array of one or more messages"
      );
    }
    if (!scope) {
      // Attempt to get scope from messages
      scope = getScope(messages);
    }
    // ensure scope is unique and sorted ascending alphabetically
    scope = uniq(scope).sort();

    // build a public->private key mapping
    const keyMap = this.keyProvider.reduce((map, wif) => {
      map[ecc.privateToPublic(wif)] = wif;
      return map;
    }, {});

    try {
      // Get info on head on chain
      console.log(eosEndpoint);
      const info = await request(`${eosEndpoint}/v1/chain/get_info`);
      const expr = moment(new Date(`${info.head_block_time}Z`))
        .add(60, "seconds")
        .toISOString()
        .split(".")[0];

      // Build transaction from data
      const transaction = {
        refBlockNum: info.head_block_num & 0xffff,
        refBlockPrefix: new Buffer(info.head_block_id, "hex").readUInt32LE(8),
        expiration: expr,
        scope,
        readscope: [],
        messages
      };
      // construct a buffer of the transaction to sign
      const trBuffer = Buffer.concat([
        chainId,
        Fcbuffer.toBuffer(this.structs.Transaction, transaction)
      ]);

      const { required_keys } = await this.eos.getRequiredKeys(
        transaction,
        Object.keys(keyMap)
      );

      const signatures = [];
      (required_keys || []).forEach(pubKey => {
        if (!keyMap[pubKey]) {
          throw new Error(
            `APIClient: missing necessary private key for signing, needs private key for ${
              pubKey
            }`
          );
        }
        signatures.push(ecc.sign(trBuffer, keyMap[pubKey]));
      });

      transaction.signatures = signatures;

      return await request(`${apiEndpoint}${path}`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify(transaction)
      });
    } catch (err) {
      console.error("fetch error:", err);
    }
  }
}

// Export singleton instance
export let apiClient = new APIClient({ keyProvider: [] });

// Export class
export default APIClient;
