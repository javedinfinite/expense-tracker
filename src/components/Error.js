import React from "react";
import Button from "@material-ui/core/Button";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import { Link } from "react-router-dom";

const myDiv = {
  backgroundPosition: "center",
  backgroundSize: "100% 100%",
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Error = () => {
  return (
    <div>
      <div style={myDiv}>
        <div>
          <Button
            style={{ marginTop: "5%" }}
            size="large"
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            endIcon={<TouchAppIcon />}
          >
            Invalid Route - Go back home.
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
