import React, { Component } from "react";
import { numbers } from "../api";
import { Typography, Grid, CardContent, Card } from "@material-ui/core";
import cx from 'classnames'

import styles from '../styles/number.module.css'

class number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
    };
  }

  async componentDidMount() {
    const confirm = await numbers(this.props.city);
    if (!confirm) {
      return "Loading....";
    }
    this.setState({
      data: confirm,
    });
    console.log(confirm);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.city !== this.props.city) {
      const confirm = await numbers(this.props.city);
      console.log(confirm);
      this.setState({
        data: confirm,
      });
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={3} justify="center">
          <Grid item component={Card} xs={12} md={9} className = {cx(styles.card, styles.confirm)} >
            <CardContent>
              <Typography gutterBottom>전일대비 증가 수</Typography>
              <Typography>{this.state.data}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default number;
