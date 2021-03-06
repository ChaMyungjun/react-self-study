import React from "react";
import Input from "./components/numInput";
import DeliverName from "./components/deliveryPicker";
import styles from "./styles/App.module.css";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import DeliverParsing from "./components/deliveryParsing";

class App extends React.Component {
  state = {
    number: 0,
    name: 0,
  };

  handleNumber = async (deliverNum) => {
    this.setState({
      number: deliverNum,
    });
  };

  handleName = async (deliverName) => {
    console.log(deliverName);
    this.setState({
      name: deliverName,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className={styles.form}>
          <AppBar position="static" color = 'secondary'>
            <Toolbar className={styles.toolBar}>
              <Typography
                variant="h4"
                component="h2"
                noWrap
                gutterBottom
                className={styles.title}
              >
                택배 조회
              </Typography>
              <DeliverName handleNamechange={this.handleName} />
              <Input handleNumberChange={this.handleNumber} />
            </Toolbar>
          </AppBar>
        </div>
        <DeliverParsing number={this.state.number} name={this.state.name} />
      </React.Fragment>
    );
  }
}

export default App;
