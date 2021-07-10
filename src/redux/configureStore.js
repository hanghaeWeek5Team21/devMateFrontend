import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "history";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

