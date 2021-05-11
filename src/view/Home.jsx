import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  List,
  Message,
  Segment,
} from "semantic-ui-react";
import { add, remove } from "../redux/reducer/pincode";
import { changeResult, deleteResult } from "../redux/reducer/result";
import { fetchIteratively } from "./fetch";

const Home = () => {
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPinCodeError] = useState("");
  const pincodes = useSelector((state) => state.pincodes.pincodes);
  const result = useSelector((state) => state.result.result);
  const soundEnabled = useSelector((state) => state.result.soundEnabled);
  const dispatch = useDispatch();
  const audio = useSelector((state) => state.result.audio);
  const wrongPincodes = pincodes.filter(
    (pincode) => result[pincode].status === "error"
  );
  useEffect(() => {
    fetchIteratively();
  }, []);
  useEffect(() => {
    audio.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );
  }, [audio]);

  useEffect(() => {
    audio.muted = !soundEnabled;
  }, [audio, soundEnabled]);

  useEffect(() => {
    let flag = true;
    Object.keys(result).forEach((key) => {
      if (result[key].status === "found") {
        flag = false;
        audio.paused && audio.play();
      }
    });
    if (flag && !audio.paused) {
      audio.pause();
    }
  }, [audio, result]);

  return (
    <Container
      fluid
      className="p-0"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Container fluid className="main-header-container">
        <Header inverted textAlign="center" className="main-title">
          Covid Vaccine Tracker
        </Header>
      </Container>
      <Container
        fluid
        style={{ flexDirection: "3", flexGrow: 1 }}
        className="p-0"
      >
        <Container>
          <Divider hidden section />
          <Header textAlign="center" size="huge">
            Enter Pincode to set Alert
          </Header>
          <Segment basic>
            <Form
              error={pincodeError.length > 0}
              onSubmit={() => {
                if (pincode.length !== 6) {
                  setPinCodeError("Pincode can only be of 6 digits");
                } else {
                  dispatch(
                    changeResult({
                      pincode,
                      result: {
                        status: "finding",
                        availability: 0,
                        centers: [],
                      },
                    })
                  );
                  dispatch(add(pincode));
                  setPinCodeError("");
                  setPincode("");
                }
              }}
            >
              <Form.Input
                value={pincode}
                type="number"
                onChange={(evt, data) => {
                  const newValue = data.value;
                  if (newValue.length > 6) {
                    setPinCodeError("Pincode cannot be more than 6 digits");
                  } else {
                    setPinCodeError("");
                  }
                  if (/^\d*$/.test(data.value)) {
                    setPincode(data.value);
                  }
                }}
                action={{
                  color: "teal",
                  content: "Go",
                  disabled: pincodeError.length > 0 || pincode.length !== 6,
                }}
              />
              <Message error header="Action Forbidden" content={pincodeError} />
            </Form>
          </Segment>
        </Container>
        <Container>
          <Divider hidden />
          {pincodes.length > 0 && (
            <Segment textAlign="center">
              <Header>Gives Alert For Following Pincodes</Header>
            </Segment>
          )}
          <Grid stackable columns={4}>
            {pincodes.map((el, index) => {
              return (
                <Grid.Column key={index}>
                  <Card color="teal">
                    <Card.Content>
                      <Icon
                        style={{ float: "right", cursor: "pointer" }}
                        name="trash"
                        color="teal"
                        onClick={() => {
                          dispatch(remove(el));
                          dispatch(deleteResult(el));
                        }}
                      />
                      <Card.Header>{el}</Card.Header>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              );
            })}
          </Grid>
        </Container>
        <Container>
          {pincodes
            .map((pincode) => {
              return (
                result[pincode].status === "found" && (
                  <>
                    <Divider hidden />
                    <Segment basic>
                      <Header>
                        Centers have been found in {pincode} with{" "}
                        {result[pincode].availability} vaccines available:
                      </Header>
                      <List bulleted>
                        {result[pincode].centers &&
                          result[pincode].centers.map((center) => (
                            <List.Item>{center}</List.Item>
                          ))}
                      </List>
                    </Segment>
                  </>
                )
              );
            })
            .filter(Boolean)}
        </Container>
        <Divider hidden />
        {wrongPincodes.length > 0 && (
          <Container basic textAlign="center">
            <Message error>
              Error occured in getting data for {wrongPincodes.join(", ")}{" "}
              {wrongPincodes.length > 1 ? "pincodes" : "pincode"}
            </Message>
          </Container>
        )}
      </Container>
      <Container fluid className="footer mt-4">
        <Header inverted textAlign="center">
          Keep Browser open in background in order for this app to work.
        </Header>
      </Container>
    </Container>
  );
};

export default Home;