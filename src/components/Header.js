import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  box: {
    display: "flex",
    padding: `${theme.spacing(5)}px 0 `,
    justifyContent: "center",
    backgroundColor: "#ff6464",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  formControl: {
    margin: `${theme.spacing(2)}px 0 `,
  },
  iconButton: {
    padding: 10,
  },
}));

const Header = ({ handleClick, setValue }) => {
  const classes = useStyles();
  const [enable, setEnable] = React.useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    e.target.value.length === 0 ? setEnable(false) : setEnable(true);
  };

  return (
    <>
      <Box className={classes.box}>
        <Paper component="form" classes={{ root: classes.root }}>
          <TextField
            className={classes.input}
            InputProps={{
              classes: { formControl: classes.formControl },
              disableUnderline: true,
            }}
            required
            type="url"
            id="json-url"
            label="Enter JSON url"
            defaultValue=""
            onChange={handleChange}
            placeholder="https://www.example.com"
          />
          <IconButton
            classes={{ root: classes.iconButton }}
            aria-label="url"
            disabled={!enable}
            onClick={handleClick}
          >
            <AccountTreeIcon />
          </IconButton>
        </Paper>
      </Box>
    </>
  );
};

export default Header;
