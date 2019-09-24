import React, { useState } from "react";
import { TreeView } from "@progress/kendo-react-treeview";

const tree = [{
  text: 'Furniture',
  expanded: true,
  items: [{
      text: 'Tables & Chairs'
  }, {
      text: 'Sofas'
  }, {
      text: 'Occasional Furniture'
  }]
}, {
  text: 'Decor',
  items: [{
      text: 'Bed Linen'
  }, {
      text: 'Curtains & Blinds'
  }, {
      text: 'Carpets'
  }]
}];

const TreeDummyComponent = props => {
  const onExpandChange = (event) => {
    event.item.expanded = !event.item.expanded;

  } 
  const onItemClick = (event) => {
    event.item.selected = !event.item.selected;
    // this.forceUpdate();
  }


  return (
     <div>
     <TreeView
                data={tree}
                expandIcons={true}
                onExpandChange={onExpandChange}
                onItemClick={onItemClick}
                aria-multiselectable={true}
                checkboxes={true}
            />  
    </div>
  )
};

export default TreeDummyComponent;
