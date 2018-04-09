import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { StripeProvider } from "react-stripe-elements"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from "./App"

const rootEl = document.getElementById("root");
const renderApp = () =>
  render(
    <StripeProvider apiKey="pk_test_9QPuYWOs5fSjGmRCNWCgAYHL">
      <Provider store={store}>
        <App />
      </Provider>
    </StripeProvider>,
    rootEl,
  )

renderApp()

if (module.hot) {
  module.hot.accept(renderApp)
}
