import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import _ from "underscore";

const stub = {"ProductInfo":[{"ProductId":1,"ProductName":"Roller","ProductDisplayInfoLargeLockedImagePath":"Styles/images/roller_locked.svg","ProductFamily":"Shades","ProductDisplayInfoLargeImagePath":"Styles/images/roller_large.svg","ProductClassName":"Roller Shade"},{"ProductId":11,"ProductName":"Drapery","ProductDisplayInfoLargeLockedImagePath":"Styles/images/Drapery_locked.svg","ProductFamily":"Shades","ProductDisplayInfoLargeImagePath":"Styles/images/Drapery_large.svg","ProductClassName":"Drapery"}],"BomDetail":[{"BillOfMaterialsLineItemId":120169,"ProductId":1,"Name":"Roller Shade 1","Quantity":1,"MinPrice":1334.33,"MaxPrice":1334.33,"IsLocked":false,"IsFullyConfigured":true,"ModelNumber":"QSSRS10A13","IsErroneous":false,"ValidationErrorType":0,"ErroneousFeatures":null,"SubTitles":["Roller","Sivoia QS Wired Roller 64","57 in x 50 in, Outside Mount","E Screen 5% Charcoal/Apricot, 3.5 in x 3.5 in"],"FabricColor":"Charcoal/Apricot","FabricThumbnailImgName":"Classico_Roller_S3071-E-5_thumb.jpg","FabricId":"S3071-E-5","QuotableTill":null,"LeadTime":"20","OrderableFromDate":null,"RowVersion":"AAAAAAAAJys=","IsOrderable":true,"IsOrderableFromDateTBD":false,"BillOfMaterialsLineItemConfigurationId":110183,"Order":1,"ListPriceAdjustment":0.0,"OverrideDiscountedPrice":null,"OverrideListPrice":null},{"BillOfMaterialsLineItemId":120170,"ProductId":11,"Name":"Drapery 1","Quantity":1,"MinPrice":7892.77,"MaxPrice":7892.77,"IsLocked":false,"IsFullyConfigured":true,"ModelNumber":"QSSDS145STR","IsErroneous":false,"ValidationErrorType":0,"ErroneousFeatures":null,"SubTitles":["Drapery","Sivoia QS Wired D145 Drapery Track","150 in, Ceiling Mount Mount"],"FabricColor":null,"FabricThumbnailImgName":null,"FabricId":null,"QuotableTill":null,"LeadTime":"20","OrderableFromDate":null,"RowVersion":"AAAAAAAAJyw=","IsOrderable":true,"IsOrderableFromDateTBD":false,"BillOfMaterialsLineItemConfigurationId":110184,"Order":2,"ListPriceAdjustment":0.0,"OverrideDiscountedPrice":null,"OverrideListPrice":null},{"BillOfMaterialsLineItemId":120173,"ProductId":11,"Name":"Drapery 2","Quantity":1,"MinPrice":1893.88,"MaxPrice":1893.88,"IsLocked":false,"IsFullyConfigured":true,"ModelNumber":"QSSDS145STR","IsErroneous":false,"ValidationErrorType":0,"ErroneousFeatures":null,"SubTitles":["Drapery","Sivoia QS Wired D145 Drapery Track","129 in, Ceiling Mount Mount"],"FabricColor":null,"FabricThumbnailImgName":null,"FabricId":null,"QuotableTill":null,"LeadTime":"10","OrderableFromDate":null,"RowVersion":"AAAAAAAAJy4=","IsOrderable":true,"IsOrderableFromDateTBD":false,"BillOfMaterialsLineItemConfigurationId":110187,"Order":3,"ListPriceAdjustment":0.0,"OverrideDiscountedPrice":null,"OverrideListPrice":null}]}

const BomLineItemListComponent = () => {
  // Define states
  const [bomDetails, setBomDetails] = useState([]);
  const [productInfoMap, setProductInfoMap] = useState({});

  // Http requests
  const fetchBomLineItems = ({
    projectId = null,
    revisionId = null,
    areaId = null,
    callback = null,
  } = {}) => {
    const url = `api/project/projects/${projectId}/revisions/${revisionId}/areas/${areaId}/bomLineItems/view`;
    axios
      .get(url)
      .then(res => {
        console.log(`GET ${url} OK: ${res.status}`);
        console.log(res);
        callback(res, null);
      })
      .catch(err => {
		console.log(`ERR: ${err.message}`);
		
        callback({data: stub}, null);
      });
  };

  const renderBomDetailRows = bomDetailRows => {
    const renderBomDetailRowDetails = bomDetail => {};

    const renderBomDetailRowPrice = bomDetail => {
      return `$${bomDetail["MinPrice"]} - $${bomDetail["MaxPrice"]}`;
    };

    return _.map(bomDetailRows, bomDetail => {
      return {
        Item: bomDetail,
        Details: { Name: bomDetail["Name"], SubTitles: bomDetail["SubTitles"] },
        Quantity: bomDetail["Quantity"],
        Price: renderBomDetailRowPrice(bomDetail),
        inEdit: true,
      };
    });
  };

  const RowItemCell = props => {
    const bomProductId = props.dataItem[props.field]["ProductId"];
    const productInfo = productInfoMap[bomProductId];
    const imgPath = productInfo["ProductDisplayInfoLargeImagePath"];
    return (
      <td>
        <img src={imgPath} alt="" style={{"max-width": "50%", "display" :"block", "margin" :"auto"}}/>
      </td>
    );
  };

  const RowDetailsCell = props => {
	 
    const bomDetail = props.dataItem[props.field];
    const bomName = bomDetail["Name"];
    const subtitles = _.map(bomDetail["SubTitles"], bd => <h6 key={bd}>{bd}</h6>);
    return (
      <td>
        <h5>{bomName}</h5>
        {subtitles}
      </td>
    );
  };

  const onSelectionChange = e => {
    console.log(e);
  };

  const onHeaderSelectionChange = e => {
    console.log(e);
  };

  const onRowClick = e => {
    console.log(e);
  };

  const onEdit = e => {
    console.log(e);
    console.log(e.value);
    // const newBomDetails =
  };

  // Side Effects
  useEffect(() => {
    fetchBomLineItems({
      projectId: 20031,
      revisionId: 80040,
      areaId: 80112,
      callback: (res, err) => {
        if (err) {
          // take care of errors
          return;
        }
        if (res && res.data) {
          const fetchJson = res.data;
          const bomDetails = fetchJson["BomDetail"];
          const productInfoList = fetchJson["ProductInfo"];
          const productInfoMap = {};
          for (var k in productInfoList) {
            const productInfo = productInfoList[k];
            productInfoMap[productInfo["ProductId"]] = productInfo;
		  }
          setProductInfoMap(productInfoMap);
          setBomDetails(bomDetails);
          return;
        }
      },
    });
  }, []);

  return (
    <div>
      <hr />
      <h3>Kendo React DataGrid POC</h3>
      <hr />
      <Grid
        style={{ height: "700px" }}
        data={renderBomDetailRows(bomDetails)}
        selectedField={"selected"}
        onSelectionChange={onSelectionChange}
        onHeaderSelectionChange={onHeaderSelectionChange}
        onRowClick={onRowClick}
        editField="inEdit"
        onItemChange={onEdit}
      >
        <Column field="selected" />
        <Column field="Item" title="Item" cell={RowItemCell} width="150%" />
        <Column field="Details" title="Details" cell={RowDetailsCell} width="300%"/>
        <Column field="Quantity" title="Qty" editor="numeric" width="100%" />
        <Column field="Price" title="List Price/unit" editable={false} />
      </Grid>
      <hr />
    </div>
  );
};

export default BomLineItemListComponent;
