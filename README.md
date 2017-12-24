# EOS Web Wallet &nbsp; [![Build Status](https://travis-ci.org/Tandemly/eos-web-wallet.svg?branch=develop)](https://travis-ci.org/Tandemly/eos-web-wallet)

This is the web based wallet for EOS. The goal of the web wallet is to eventually be a multi-token wallet; but for now
is aiming to support the most recent version of EOS with some basic wallet features.

* Allow users to create a profile and login to the wallet
* From within the wallet, users should be able to connect their EOS account
* Allow users to update their wallet profile information
* Once users have connected an EOS account, they can
    * See their current EOS balance
    * See their most recent transaction history
    * Make a transfer of EOS to another EOS account
* Allow users to disconnect an EOS account they've connected.

## Environment & Requirements
This web wallet assumes that there is an EOS network that you want to connect to and 
an host running an instance of the [EOS API Service](https://github.com/Tandemly/eos-api-service) connected to that same EOS network.


The Web Wallet is a standard create-react-app React application with the addition 
of its own Node server and database. It functions as a standalone web application 
from a third-party point-of-view that would operate against the EOS platform.

Because of runtime dependencies needed for transaction buffer structures (related to ABIs), 
the Wallet can not solely depend on the API alone for interacting with an existing EOS 
blockchain network.  Signing transactions is done *only* on the client-side and key pairs 
are never transmitted across the network or saved on a server (_the Wallet's or the API
service_).

This is the basic environment the web wallet operates within:

![Wallet Environment](docs/Web-Wallet-EOS-Basic-Diagram.png?raw=true "Wallet Environment")

### `eosd` Connector Host
The Wallet will need a specific `eosd` "connector" or "read-only" node configured and 
running, which will allow it to get the required transaction buffer structures at runtime 
and perform required key checks when signing transactions.  That `eosd` node should be configured (_via the `config.ini` for eosd_) with the following settings:

```
# The Access-Control-Allow-Origin http value
access-control-allow-origin = *

# The Access-Control-Allow-Headers http value
access-control-allow-headers = Content-Type

# true if Access-Control-Allow-Credentials: true should be specified in http response header
access-control-allow-credentials = true

# MongoDB target host
mongodb-uri = mongodb://eosdemo:eosdemo1234@ds111336.mlab.com:11336/eos-demo

plugin = eosio::producer_plugin
plugin = eosio::http_plugin
plugin = eosio::chain_plugin
plugin = eosio::db_plugin
plugin = eosio::chain_api_plugin
plugin = eosio::account_history_plugin
plugin = eosio::account_history_api_plugin
```
With the use of the `db_plugin`, the mongo database setup to receive information from 
this chain also becomes the source of information for the API services.  It is a shared 
database and can be hosted and scaled to meet processing, user and network needs.

See the [EOS repository](https://github.com/EOSIO/eos) for more information about setting up and running an `eosd` instance.

### EOS API Service
The wallet will also need the [EOS API service](https://github.com/Tandemly/eos-api-service) 
hosted somewhere and connected to the same `eosd` node and database as above. 
The API service can be configured to point to the proper `eosd` node and mongo database 
using the following settings in a local `.env` file. 

Let's say our mongo database is available at `mongodb://db.company.com:27017` with a 
userid of `eosdb`, password of `eosdb1234` and the database name is `EOS`. 

And our previous `eosd` "connector" node is available at `http://10.200.11.160:8888` 
(_the `8888` is the default port for the `http_plugin`_).

The API Service's local `.env` file prior to building would then have the 
following settings:

```
MONGO_URI=mongodb://eosdb:eosdb1234@db.company.com:27017/EOS
EOSD_CONNECTOR_URI=http://10.200.11.160:8888
```

<small>*Note: there should be no trailing slashes on any of the URIs*</small>

### Wallet Configuration
With an `eosd` connector node and an API service running and available, we can now 
configure and run the Wallet. The wallet is configured through a local `.env` file.  
You can use the provided `.env.example` file to get started. 

First, clone the application from the repo and create the local `.env` file:

```bash
$ git clone https://github.com/Tandemly/eos-wallet-wip.git
$ cd eos-wallet-wip
$ cp .env.example .env
```

Given our setup above, our critical pieces in our local `.env` would be setup as follows.  
Let's assume that our API server from the step above is running at http://10.200.11.161:3000. 
We'll also assume that we've registered on the API server and requested an API key for our wallet to use.

Since the wallet needs its own database, we'll assume we've stood up a mongodb for the Wallet application to use at `mongodb://wallet:wallet123@10.200.11.170:27017` with a db named `Wallet`.

```
REACT_APP_SASS=true
REACT_APP_SASS_MODULES=true
REACT_APP_CSS_MODULES=true
NODE_PATH=src
SESSION_KEY=0a905635f252cbea0185ab3767e23240
REACT_APP_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTEzMjg2NTMsInN1YiI6IjVhMTUwYjQ4ZTBhMjFiMGFlZjRhYmM1NSIsImp0aSI6IiQyYSQxMCRDeG5CRS9ONENUdUs0bUZENnl4Ui9Pc044UXlLUUhSSFBMS2Fhc2IybDkwbWFkelc1OVlhaSIsInJvbGVzIjpbInVzZXIiXX0.AEi5Q0Wi6lnuy4euUghBTQ6nsBeZIhEWl4ujXo11It0
REACT_APP_API_URI=http://10.200.11.161:3000
REACT_APP_EOSD_URI=http://10.200.11.160:8888
MONGO_URI=mongodb://wallet:wallet123@10.200.11.170:27017/wallet
```
<small>*Note: there should be no trailing slashes on any of the URIs*</small>

The `SESSION_KEY` is used by the wallet app to handle encrypted session cookies for tracking information about the user's session when logged into the Wallet app. This can be generated using `md5` or a similar method.

The `REACT_APP_API_KEY` is the api key we got from the API server after registering and requesting one via the `/v1/auth/request-api-key` endpoint.

The other settings are simply pointing the Wallet application at the correct hosts to facilitate communicating with the EOS network via the API and the `eosd` connector node setup before.

### Running the Wallet
Once the environment is setup and your `.env` file is configured correctly, you can simply run the application using the following commands:

```bash
$ yarn 
$ yarn build
$ yarn start
```

With the wallet running, the interactions in the environment operate as in the following diagram:

![Wallet Annotated](docs/Web-Wallet-EOS-Annotated-Diagram.png?raw=true)
