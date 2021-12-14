import React, { useState } from "react";
import { StargateClient } from "@cosmjs/stargate";
import { useRouter } from "next/router";

import Button from "../../../components/inputs/Button";
import { getMultisigAccount } from "../../../lib/multisigHelpers";
import HashView from "../../../components/dataViews/HashView";
import MultisigHoldings from "../../../components/dataViews/MultisigHoldings";
import MultisigMembers from "../../../components/dataViews/MultisigMembers";
import Page from "../../../components/layout/Page";
import StackableContainer from "../../../components/layout/StackableContainer";
import TransactionForm from "../../../components/forms/TransactionForm";
import TransactionList from "../../../components/dataViews/TransactionList";
import ConnectWallet from "../../../components/forms/ConnectWallet";

export async function getServerSideProps(context) {
  let holdings;
  try {
    const client = await StargateClient.connect(
      process.env.NEXT_PUBLIC_NODE_ADDRESS
    );
    const multisigAddress = context.params.address;
    holdings = await client.getBalance(
      multisigAddress,
      process.env.NEXT_PUBLIC_DENOM
    );
    const accountOnChain = await getMultisigAccount(multisigAddress, client);

    return {
      props: { accountOnChain, holdings: holdings.amount / 1000000 },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { error: error.message, holdings: 0 },
    };
  }
}

function ConnectWalletKeplr(){
  console.log("vuong")
}

const multipage = (props) => {
  const [showTxForm, setShowTxForm] = useState(false);
  const router = useRouter();
  const { address } = router.query;
  return (
    <Page>
      <StackableContainer base>
        <StackableContainer>
          <label>Multisig Address</label>
          <h1>
            <HashView hash={address} />
          </h1>
        </StackableContainer>
        {props.error && (
          <StackableContainer>
            <div className="multisig-error">
              <p>
                This multisig address's pubkeys are not available, and so it
                cannot be used with this tool.
              </p>
              <p>
                You can recreate it with this tool here, or sign and broadcast a
                transaction with the tool you used to create it. Either option
                will make the pubkeys accessible and will allow this tool to use
                this multisig fully.
              </p>
            </div>
          </StackableContainer>
        )}
        {showTxForm ? (
          <TransactionForm
            address={address}
            accountOnChain={props.accountOnChain}
            holdings={props.holdings}
            closeForm={() => {
              setShowTxForm(false);
            }}
          />
        ) : (
          <div className="interfaces">
            <div className="col-1">
              <MultisigHoldings holdings={props.holdings} />
            </div>
            <div className="col-2">
              <StackableContainer lessPadding>
                <h2>ADD</h2>
                <p>
                Add DIG chain to keplr
                </p>
                <Button
                  label="Add DIG chain to keplr"
                  onClick={() => {
                      console.log("vuong")
                      if (!window.keplr) {
                          alert("Please install keplr extension");
                      }
                      else {
                        window.keplr.enable("cosmoshub-4");
                        console.log("vuong")
                        window.keplr.experimentalSuggestChain({
                          chainId: "dig-1",
                          chainName: "DIG",
                          rpc: "http://65.21.202.37:8001",
                          rest: "http://65.21.202.37:8003",
                          bip44: {
                              coinType: 118,
                          },
                          bech32Config: {
                              bech32PrefixAccAddr: "dig",
                              bech32PrefixAccPub: "dig" + "pub",
                              bech32PrefixValAddr: "dig" + "valoper",
                              bech32PrefixValPub: "dig" + "valoperpub",
                              bech32PrefixConsAddr: "dig" + "valcons",
                              bech32PrefixConsPub: "dig" + "valconspub",
                          },
                          currencies: [ 
                              { 
                                  coinDenom: "dig", 
                                  coinMinimalDenom: "udig", 
                                  coinDecimals: 6, 
                                  coinGeckoId: "dig", 
                              }, 
                          ],
                          feeCurrencies: [
                              {
                                  coinDenom: "dig",
                                  coinMinimalDenom: "udig",
                                  coinDecimals: 6,
                                  coinGeckoId: "dig",
                              },
                          ],
                          stakeCurrency: {
                              coinDenom: "dig",
                              coinMinimalDenom: "udig",
                              coinDecimals: 6,
                              coinGeckoId: "dig",
                          },
                          coinType: 118,
                          gasPriceStep: {
                              low: 0.01,
                              average: 0.025,
                              high: 0.03,
                          },
                      });                    
                  }
                  
                  }}
                />
              </StackableContainer>
            </div>
          </div>
        )}
      </StackableContainer>
      <style jsx>{`
        .interfaces {
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
        }
        .col-1 {
          flex: 1;
          padding-right: 50px;
        }
        .col-2 {
          flex: 1;
        }
        label {
          font-size: 12px;
          font-style: italic;
        }
        p {
          margin-top: 15px;
        }
        .multisig-error p {
          max-width: 550px;
          color: red;
          font-size: 16px;
          line-height: 1.4;
        }
        .multisig-error p:first-child {
          margin-top: 0;
        }
      `}</style>
    </Page>
  );
};

export default multipage;
