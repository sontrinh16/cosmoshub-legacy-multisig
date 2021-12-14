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
        <StackableContainer lessPadding>
          <p>
          Already have a dig address? Enter it below. If it’s a valid address, you will be able to view its transactions and add dig-chain to keplr wallet
          </p>
        </StackableContainer>
        <StackableContainer lessPadding lessMargin>
          <Input
            onChange={this.handleChange}
            value={this.state.address}
            label="Dig Address"
            name="address"
            placeholder="dig1vqpjljwsynsn58dugz0w8ut7kun7t8ls2qkmsq"
          />
          <Button
            label="Use this Address"
            onClick={this.handleSearch}
            primary
          />
        </StackableContainer>
              <StackableContainer lessPadding>
                <h2>ADD</h2>
                <p>
                Add DIG chain to keplr
                </p>
                <Button
                  label="Add DIG chain to keplr"
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
        <style jsx>{`
          .multisig-form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .error {
            color: coral;
            font-size: 0.8em;
            text-align: left;
            margin: 0.5em 0;
          }
          .create-help {
            text-align: center;
          }
        `}</style>
      </StackableContainer>
    );
  }
}

export default withRouter(FindMultisigForm);
