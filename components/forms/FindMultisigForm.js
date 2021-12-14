import axios from "axios";
import React from "react";
import { withRouter } from "next/router";

import Button from "../inputs/Button";
import StackableContainer from "../layout/StackableContainer";
import Input from "../inputs/Input";

class FindMultisigForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      keyError: "",
      processing: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSearch = async () => {
    this.setState({ processing: true });

    this.props.router.push(`/multi/${this.state.address}`);
  };

  render() {
    return (
      <StackableContainer>
        <div className="error">
            <p>This feature is available only for dig wallet start with "dig1"</p>
        </div>

        <div className="changeMargin">
        <StackableContainer lessPadding>

          <Button
            label="Connect wallet"
            onClick={() => {
                if (!window.keplr) {
                    alert("Please install keplr extension");
                }
                else {
                  window.keplr.enable("cosmoshub-4");
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


        <StackableContainer lessPadding lessMargin>
          <div className="feature_name" >
              IF YOUR WALLET START WITH "0x" YOU CAN ONLY SEE YOUR BALANCE 
          </div>
          
          <div className="changeMargin">
            <Input
              onChange={this.handleChange}
              value={this.state.address}
              label="Dig Address"
              name="address"
              placeholder="0x1a2b3c4d5e..."
            />  
          </div>
            <Button
              label="See your dig balance"
              onClick={this.handleSearch}
              primary
            />

          
        </StackableContainer>
        <style jsx>{`
          .changeMargin {
            margin-top: 0.5em;
          }
          .multisig-form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .error {
            margin-top: 0.5em;
            color: coral;
            font-size: 0.8em;
            text-align: center;
            margin: 0.5em 0;
          }
          .create-help {
            text-align: center;
          }.feature_name{
            color: Plum	
          }
        
        `}</style>
      </StackableContainer>
    );
  }
}

export default withRouter(FindMultisigForm);
