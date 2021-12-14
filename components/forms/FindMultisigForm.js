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
            label="Use this Multisig"
            onClick={this.handleSearch}
            primary
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
