const WALLET_CONNECT_PROJECT_ID = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID

if (!WALLET_CONNECT_PROJECT_ID)
  throw new Error("WALLET_CONNECT_PROJECT_ID not provided");

export const wagmiConfig = ({
  appName: "Eth Evacuations",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [],
});
