import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { validateKey } from "./util";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Expense() {

  const classes = useStyles();
  const [expenses, setExpenses] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [balance, setbalance] = React.useState(0);
  const [error, setError] = React.useState(false);

  const addTransaction = (type) => {
    setError(false);
    if (input == "" || input == null || input == 0) return;
    const timeStamp = new Date().toISOString("IST");
    if (type == "add") {
      setExpenses(
        expenses.concat({ type: "Add", amount: input, timestamp: timeStamp })
      );
      setbalance(parseInt(balance) + input);
    } else if (type == "remove") {
      if (balance < input) {
        setError(true);
        return;
      }

      setExpenses(
        expenses.concat({ type: "Remove", amount: input, timestamp: timeStamp })
      );
      setbalance(parseInt(balance) - input);
    }
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Card className={classes.root} style={{ backgroundColor: "#89c8bc" }}>
        <CardContent>
          <Typography
            variant="h3"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Expense Tracker - Basic
          </Typography>
          <Card className={classes.root} style={{ marginTop: "1%" }}>
            <CardContent style={{ textAlign: "center" }}>
              {error && (
                <p style={{ color: "red" }}>
                  You don't have sufficient balance
                </p>
              )}
              <Typography
                variant="h5"
                component="h2"
                style={{ marginBottom: "2%" }}
              >
                Balance : {balance}
              </Typography>
              <Typography style={{ marginBottom: "3%" }}>
                <TextField
                  id="standard-number"
                  onKeyDown={(e) => {
                    if (!validateKey(e)) {
                      e.preventDefault();
                    }
                  }}
                  label="Number"
                  type="number"
                  onChange={(e) => setInput(parseInt(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Typography>
              <Button
                onClick={() => addTransaction("add")}
                size="small"
                variant="contained"
                color="primary"
                className={classes.margin}
              >
                Add
              </Button>
              <Button
                onClick={() => addTransaction("remove")}
                size="small"
                variant="contained"
                color="secondary"
                className={classes.margin}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
          <Card className={classes.root} style={{ marginTop: "2%" }}>
            <Typography variant="h5" component="h2" style={{ padding: "2%" }}>
              <b>Transactions:</b>
            </Typography>
            <CardContent
              style={{
                maxHeight: "200px",
                overflow: "auto",
                backgroundColor: "aliceblue",
              }}
            >
              <Typography variant="h6" component="h2">
                {expenses.map((object) => (
                  <p style={{ margin: "0%" }}>
                    {object.timestamp} -{" "}
                    <span
                      style={{
                        color: object.type == "Add" ? "#3f51b5" : "#f50057",
                      }}
                    >
                      {object.amount} - {object.type}
                    </span>{" "}
                  </p>
                ))}
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Container>
  );
}
