import React from "react";
import Header from "./Header";
import Tree from "./Tree";
import { CircularProgress } from "@material-ui/core";

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const Home = () => {
  const [value, setValue] = React.useState(null);
  const [json, setJson] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [length, setLength] = React.useState(0);

  const getJsonData = React.useCallback(() => {
    if (validURL(value)) {
      setLoading(true);
      try {
        fetch(value)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setLoading(false);
            setLength(Object.keys(data).length);
            return setJson(data);
          });
      } catch (error) {
        console.error("Unable to fetch JSON:", error);
      }
    }
  }, [value]);

  return (
    <>
      <Header handleClick={getJsonData} setValue={setValue} />
      {loading ? <CircularProgress /> : <Tree data={json} length={length} />}
    </>
  );
};
export default Home;
