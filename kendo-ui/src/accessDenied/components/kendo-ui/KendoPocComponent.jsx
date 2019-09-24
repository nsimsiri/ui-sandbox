import React from "react";
import { Container, Row, Col } from "react-bootstrap"
// import GridDummyComponent from "./accessDenied/components/kendo-ui/GridDummy";
// import TreeDummyComponent from "./accessDenied/components/kendo-ui/TreeDummy";
// import BomLineItemListComponent from "./accessDenied/components/kendo-ui/BomLineItemList";

import BomLineItemListComponent from "./BomLineItemList";
import AreaTreeComponent from "./AreaTree.jsx";

import TreeDummyComponent from "./TreeDummy";

const KendoPocComponent = props => {
  return (
    <div>
      <Container fluid={true}> 
        <Row>
          {/* <Col sm={3}><TreeDummyComponent /></Col> */}
          <Col sm={3}> <AreaTreeComponent /></Col>
          <Col sm={9}> <BomLineItemListComponent /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default KendoPocComponent;
