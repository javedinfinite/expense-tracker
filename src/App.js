import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchAppBar from "./components/Appbar";
import {Switch, Route, HashRouter, BrowserRouter} from "react-router-dom";
import Error from "./components/Error";
import Products from "./components/Expense";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow:'hidden'
  },
}));

function App() {
  const classes = useStyles();
  return (
      <HashRouter>
        <div className={classes.root}>
          <SearchAppBar />
          <Switch>
            <Route exact path="/" component={Products} />
            <Route component={Error} />
          </Switch>
        </div>
      </HashRouter>
  );
}

export default App;
