import React from "react";
import styled from "styled-components";
// import KendoPocComponent from "accessDenied/components/kendo-ui/KendoPocComponent";

import KendoPocComponent from "./kendo-ui/KendoPocComponent"
import axios from "axios";

// Library name definitions
const LIB_KENDO = "kendo";
const LIB_MATERIAL = "material";
const LIB_BLUEPRINT = "blueprint";

const AccessDeniedMasterComponent = () => {

  // Client-side authentication
  // const loadRequestToken = () => {
  //   const metaTag = $("meta")[2];
  //   const metaContentTag = $(metaTag.content);
  //   const csrfToken = metaContentTag.attr("value");
  //   return csrfToken;
  // };

  // // Global Axios configuration
  // axios.defaults.headers.common["X-CSRFToken"] = loadRequestToken();
  // console.log(`X-CSRFToken: ${loadRequestToken()}`);

  // Conditional renderin on UI-Library
  /* MODIFY TO RENDER YOUR POC COMPONENT */
  const UI_LIBRARY_NAME = LIB_KENDO;

  const renderKendoUI = () => UI_LIBRARY_NAME == LIB_KENDO;
  const renderMaterialUI = () => UI_LIBRARY_NAME == LIB_MATERIAL;
  const renderBlueprint = () => UI_LIBRARY_NAME == LIB_BLUEPRINT;

  const renderUILibrary = () => {
    if (renderKendoUI()) {
      return <KendoPocComponent />;
    } else if (renderBlueprint()) {
      return <h1>-- RENDER BLUEPRINT UI POC HERE -- </h1>;
    } else if (renderMaterialUI()) {
      return <h1>-- RENDER MATERIAL UI POC HERE -- </h1>;
    } else {
      return <h1>No UI Library rendered</h1>;
    }
  };
  return (
    <div>
      <StylishDiv>Access Denied Master Component</StylishDiv>
      {renderUILibrary()}
    </div>
  );
};

const StylishDiv = styled.div`
  padding: 12px;
  font-family: "Dank Mono";
  font-size: 24px;
  background-color: #212121;
  color: #bada55;
`;

export default AccessDeniedMasterComponent;
