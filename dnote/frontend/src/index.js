import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import "styles/index.scss";
import registerServiceWorker from "./serviceWorker";

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
