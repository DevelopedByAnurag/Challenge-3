import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Alert,
  InputGroup,
  Tabs,
  Tab,
} from "react-bootstrap";
import { keys } from "regenerator-runtime";
import Big from "big.js";

const BN = require("bn.js");

const Buywnear = (props) => {
  const [state, setState] = React.useState({
    amount: 1,
    reciverid: "",
    formError: "",
  });
  const Buywwner = async () => {
    if (state.amount >= 1) {
      await window.contract.near_deposit(
        {},
        200000000000000,
        new BN(
          Big(state.amount)
            .times(10 ** 24)
            .toFixed()
        )
      );
    } else {
      setState({
        ...state,
        ["formError"]:
          "Amount Should be Greater than 1 Near",
      });
    }
  };
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  return (
        <Card style={{ padding: "2vh" }}>
          <Container>
            <Row style={{ marginBottom: "2vh" }}>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Buy Wnear </Form.Label>

                <InputGroup className="mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name="amount"
                    value={state.amount}
                    min={1}
                    max={ window.accountId &&
                      Big(window.userbalance.total)
                        .div(10 ** 24)
                        .toFixed()}
                    step={0.1}
                    onChange={handleChange}
                  />

                  <InputGroup.Text id="basic-addon2">wNear</InputGroup.Text>
                  <InputGroup className="mb-3">
                    <Form.Label>Avilable Near </Form.Label>
                  </InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    value={
                      window.accountId &&
                      Big(window.userbalance.total)
                        .div(10 ** 24)
                        .toFixed()
                    }
                    disabled
                  />

                  <InputGroup.Text id="basic-addon2">Near</InputGroup.Text>
                </InputGroup>
              </Form.Group>{" "}
            </Row>
            {state.formError && (
              <Alert variant="danger">{state.formError}</Alert>
            )}{" "}
            <Row className="d-flex justify-content-center">
              <Button onClick={Buywwner} style={{ width: "50vw" }}>
                Buy Wnear
              </Button>
            </Row>
            <Row className="d-flex justify-content-center"></Row>
          </Container>
        </Card>
  );
};

Buywnear.propTypes = {};

export default Buywnear;
