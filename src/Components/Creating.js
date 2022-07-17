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
  Nav,
  ListGroup,
  Col

} from "react-bootstrap";
import Study from "../assets/study.webp";
import Food from "../assets/Food.jpg";
import Cloths from "../assets/Cloths.jpg";
import Animals from "../assets/Animals.jpg";

import { keys } from "regenerator-runtime";
import Big from "big.js";

const BN = require("bn.js");

const Creating = (props) => {
  const [state, setState] = React.useState({
    formError: "",
  });
  const create = async (memo,amount) => {
    if (memo && amount >= 1) {
      await window.contract.ft_transfer_call(
        {
          amount: `${Big(amount)
            .times(10 ** 24)
            .toFixed()}`, // 1 NEAR
          receiver_id: "streaming-r-v2.dcversus.testnet",

          memo: `${memo}` || "",
          msg: JSON.stringify({
            Create: {
              request: {
                owner_id: `${window.accountId}`,
                receiver_id: `anuragbatra.testnet`,
                tokens_per_sec: parseInt(
                  `${Big(385802469135802469).times(amount).toFixed()}`
                ).toString(), // 1 month for 1 NEAR
              },
            },
          }),
        },
        200000000000000,
        new BN("1")
      );
    } else {
      setState({
        ...state,
        ["formError"]:
          "Reciever Field is Required & Amount Should be Greater than 1 Near",
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
console.log(props.balance)
  return (
    <Row xs={1} md={2} className="g-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={Food} />
            <Card.Body>
              <Card.Title>Donate Food For Poor Peoples</Card.Title>
              <Card.Text>
              Help By Donating Money for buying Food for poor people.
              </Card.Text>

             {props.balance < `${Big(5).times(10 ** 24).toFixed()}` ? <p>You Don't Have enough wNear</p>:<Button variant="primary" onClick={() => create('Donate Food',5)}>Donate Now 5Wnear</Button>} 
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={Animals} />
            <Card.Body>
              <Card.Title>Help Animals</Card.Title>
              <Card.Text>
                Help Animals who lives on street by providing them shelter and a place where they can eat.
              </Card.Text>
              {props.balance < `${Big(5).times(10 ** 24).toFixed()}` ? <p>You Don't Have enough wNear</p>:<Button variant="primary" onClick={() => this.create('Donate Animals',5)}>Donate Now 5Wnear</Button>}

            </Card.Body>
          </Card>
        </Col> <Col>
          <Card>
            <Card.Img variant="top" src={Cloths} />
            <Card.Body>
              <Card.Title>Give Cloths to Poor Kids</Card.Title>
              <Card.Text>
                Help Poor By Donating them for there cloths so each kid can have cloths to wear.
              </Card.Text>
              {props.balance < `${Big(5).times(10 ** 24).toFixed()}` ? <p>You Don't Have enough wNear</p>:<Button variant="primary" onClick={() => this.create('Donate Cloths',5)}>Donate Now 5Wnear</Button>}

            </Card.Body>
          </Card>
        </Col> <Col>
          <Card>
            <Card.Img variant="top" src={Study} />
            <Card.Body>
              <Card.Title>Help People to Study</Card.Title>
              <Card.Text>
                Help People who wanna learn and stand on there feet. It will help them by paying there School or college Fees.
              </Card.Text>
              {props.balance < `${Big(5).times(10 ** 24).toFixed()}` ? <p>You Don't Have enough wNear</p>: <Button variant="primary" onClick={() => this.create('Donate Study',5)}>Donate Now 5Wnear</Button>}

            </Card.Body>
          </Card>
        </Col>
    </Row>
  );
};

Creating.propTypes = {};

export default Creating;
