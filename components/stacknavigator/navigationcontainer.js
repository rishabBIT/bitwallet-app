import CreateAccount from "../account/createAccount/createAccount";
import CreateorImport from "../account/createorimport";
import ImportAccount from "../account/importAccount/importAccount";
import Accountdetails from "../accountdetails/accountdetails";
import Certificate from "../certificate/certificate";
import Connection from "../connection/connection";
import DeepLinkHandler from "../deepLinking/deepLinking";
import Home from "../home/home";
import Menu from "../menu/menu";
import Network from "../network/network";
import NFTTransactionHistory from "../nft_transaction_history/nft_transaction_history";
import NoInternet from "../noInternet/noInternet";
import CreatePin from "../pin/createPin";
import Pin from "../pin/keypad";
import ResetAccount from "../resetAccount/resetAccount";
import Scanner from "../scanner/scanner";
import SendTransaction from "../sendTransaction/sendTransaction";
import TabViewExample from "../tabview/tabview";
import TransactionHistoryIncoming from "../transaction_history/transaction_history_incoming";
import TransactionHistoryOutgoing from "../transaction_history/transaction_history_outgoing";
import Update from "../update/update";
import AccountdetailsOne from "../accountdetails/accountdetails_one";
import TokenDetails from "../asset_details/asset_details";
import LoadingPage from "../subcomponents/loading/loadingPage";

import { useState } from "react";

const NavigationContainer = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("Home");

  const navigation = {
    navigate: (page) => setCurrentPage(page),
  };

  const routes = {
    Home: <Home navigation={navigation} currentPage={currentPage} />,
    Menu: <Menu navigation={navigation} />,
    Network: <Network navigation={navigation} />,
    CreatePin: <CreatePin navigation={navigation} />,
    CreateorImport: <CreateorImport navigation={navigation} />,
    CreateAccount: <CreateAccount navigation={navigation} />,
    ImportAccount: <ImportAccount navigation={navigation} />,
    Accountdetails: <Accountdetails navigation={navigation} />,
    AccountdetailsOne: <AccountdetailsOne navigation={navigation} />,
    ResetAccount: <ResetAccount navigation={navigation} />,
    TransactionHistoryOutgoing: (
      <TransactionHistoryOutgoing navigation={navigation} />
    ),
    TransactionHistoryIncoming: (
      <TransactionHistoryIncoming navigation={navigation} />
    ),
    TabViewExample: <TabViewExample navigation={navigation} />,
    SendTransaction: <SendTransaction navigation={navigation} />,
    Scanner: <Scanner navigation={navigation} />,
    Certificate: <Certificate navigation={navigation} />,
    Connection: <Connection navigation={navigation} />,
    Deeplink: <DeepLinkHandler navigation={navigation} />,
    Pin: <Pin navigation={navigation} />,
    NFTTransactionHistory: <NFTTransactionHistory navigation={navigation} />,
    TokenDetails: <TokenDetails navigation={navigation} />,
  };

  return routes[currentPage];
};

export default NavigationContainer;
