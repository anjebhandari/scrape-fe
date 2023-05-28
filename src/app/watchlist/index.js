import React from "react";

import Main from "./containers/ListContainer";
import AsyncAppLayout from "../../layout/index";

const WatchList = (props) => {
  return (
    <>
      <AsyncAppLayout />
      <Main {...props} />
    </>
  );
};

export default WatchList;
