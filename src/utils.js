import {
  connect,
  Contract,
  keyStores,
  WalletConnection,
  Account,
  utils,
} from "near-api-js";
import getConfig from "./config";

const nearConfig = getConfig("development");

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  window.near = near;
  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Making Config Info Public
  window.configInfo = nearConfig;

  //making utils public
  window.utils = utils;

  // Creating new account object
  window.account = new Account(near, window.accountId);
  // Initializing our contract APIs by contract name and configuration
  const accountbalance =window.accountId &&  await near.account(window.accountId);
  window.userbalance = window.accountId && await accountbalance.getAccountBalance();
  
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["ft_balance_of"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["ft_transfer_call", "near_deposit","ft_transfer" ],
    }
  );

  window.contract2 = await new Contract(
    window.walletConnection.account(),
    'streaming-r-v2.dcversus.testnet',
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["get_stream","get_account_outgoing_streams","get_account_incoming_streams"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["start_stream", "pause_stream","stop_stream","withdraw"],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName);
}
