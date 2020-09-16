import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
class Counter extends React.Component {
  @observable numbers = 0;

  @action
  increase = () => {
    this.number++;
  };

  @action
  decrease = () => {
    this.number--;
  };

  public render() {
    return (
      <div>
        <h1>{this.number}</h1>
        <button onClick={this.increase}>+1</button>
        <button onClick={this.decrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
