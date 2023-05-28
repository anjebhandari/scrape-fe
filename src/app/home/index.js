import React from "react";

import Main from "./containers/ListContainer";
import AsyncAppLayout from "../../layout/index";

const Home = (props) => {
  return(
  <>
    <AsyncAppLayout />
    <Main {...props} />
  </>);
};

export default Home;
