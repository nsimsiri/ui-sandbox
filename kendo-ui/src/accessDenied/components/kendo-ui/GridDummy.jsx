import React, { useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import axios from "axios";

const GridDummyComponent = props => {
  const products = [
    {
      ProductID: 1,
      ProductName: "Chai",
      SupplierID: 1,
      CategoryID: 1,
      QuantityPerUnit: "10 boxes x 20 bags",
      UnitPrice: 18.0,
      UnitsInStock: 39,
      UnitsOnOrder: 0,
      ReorderLevel: 10,
      Discontinued: false,
      Category: {
        CategoryID: 1,
        CategoryName: "Beverages",
        Description: "Soft drinks, coffees, teas, beers, and ales",
      },
    },
    {
      ProductID: 2,
      ProductName: "Chang",
      SupplierID: 1,
      CategoryID: 1,
      QuantityPerUnit: "24 - 12 oz bottles",
      UnitPrice: 19.0,
      UnitsInStock: 17,
      UnitsOnOrder: 40,
      ReorderLevel: 25,
      Discontinued: false,
      Category: {
        CategoryID: 1,
        CategoryName: "Beverages",
        Description: "Soft drinks, coffees, teas, beers, and ales",
      },
    },
  ];
  return (
    <div>
      <Grid style={{ height: "400px" }} data={[...products]}>
        <Column field="ProductID" title="ID" width="40px" />
        <Column field="ProductName" title="Name" width="250px" />
        <Column field="Category.CategoryName" title="CategoryName" />
        <Column field="UnitPrice" title="Price" />
        <Column field="UnitsInStock" title="In stock" />
        <Column
          field="Discontinued"
          cell={props => (
            <td>
              <input disabled type="checkbox" checked={props.dataItem[props.field]} />
            </td>
          )}
        />
      </Grid>
    </div>
  );
};

export default GridDummyComponent;
