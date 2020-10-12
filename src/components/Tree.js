import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    padding: `0px ${theme.spacing(3)}px`,
  },
  listItem: {
    padding: 0,
  },
  listItemText: {
    flex: "0 1 auto",
  },
  body1: {
    fontWeight: "bold",
  },
  listIcon: {
    minWidth: "unset",
    color: "#ff6464",
  },
}));

const ShowBrackets = ({ data, length }) => {
  const text = length > 1 ? "items" : "item";
  const brackets = Array.isArray(data) ? " [...]" : " {...}";
  return (
    <Typography component="span" variant="body2" color="textSecondary">
      {`${brackets} // ${length} ${text}`}
    </Typography>
  );
};

export default function Tree({
  data,
  length,
  parentName = "Orit treeing JSON",
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {data && (
        <ListItem
          button
          onClick={handleClick}
          classes={{ root: classes.listItem }}
        >
          <ListItemIcon
            key={Math.random() * 10}
            classes={{ root: classes.listIcon }}
          >
            {open ? <ExpandMore /> : <ChevronRight />}
          </ListItemIcon>
          <ListItemText key={Math.random() * 10}>
            <b>{parentName} </b>
            {!open && <ShowBrackets data={data} length={length} />}
          </ListItemText>
        </ListItem>
      )}
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        style={{ paddingLeft: "30px" }}
      >
        <List component="div" style={{ padding: 0 }}>
          {data &&
            Object.keys(data).map((k, i) => {
              return data[k] != null && typeof data[k] === "object" ? (
                <Tree
                  key={Math.random()}
                  data={data[k]}
                  parentName={Array.isArray(data) ? "" : k}
                  length={Object.keys(data[k]).length}
                />
              ) : (
                <>
                  <ListItem button className={classes.nested}>
                    {!Array.isArray(data) ? (
                      <ListItemText classes={{ root: classes.listItemText }}>
                        {k} :
                      </ListItemText>
                    ) : (
                      ""
                    )}
                    <ListItemText>
                      {data[k] === null ? "null" : data[k].toString()}
                    </ListItemText>
                  </ListItem>
                </>
              );
            })}
        </List>
      </Collapse>
    </>
  );
}
