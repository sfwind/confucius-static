import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import rootReducer from "./rootReducer"

declare var module

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware)
    )
  )

  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextReducer = require("./rootReducer")
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
