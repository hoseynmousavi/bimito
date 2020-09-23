import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, withRouter} from "react-router-dom"
import "./styles/index.scss"
import App from "./App"
import serviceWorker from "./serviceWorker"

const WrappedApp = withRouter(App)

ReactDOM.render(<React.StrictMode><BrowserRouter><WrappedApp/></BrowserRouter></React.StrictMode>, document.getElementById("root"))

serviceWorker()