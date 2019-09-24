import React, { useState } from "react";
import { TreeView } from "@progress/kendo-react-treeview";

const stub = [
    {
       "RevisionId":80039,
       "ProjectId":20030,
       "Number":0,
       "Areas":[
          {
             "AreaId":80108,
             "RevisionId":80039,
             "Name":"All Areas",
             "ParentAreaId":null,
             "IsBaseArea":true,
             "IsActive":true,
             "Areas":null,
             "IsDeleted":false,
             "BillOfMaterialsLineItemsCount":0,
             "Order":1,
             "QuoteIds":[
 
             ],
             "LockStatusValue":0,
             "LockStatus":0,
             "ProductCategories":null,
             "IsQuotableTillDateExpired":false
          },
          {
             "AreaId":80109,
             "RevisionId":80039,
             "Name":"node1",
             "ParentAreaId":80108,
             "IsBaseArea":false,
             "IsActive":true,
             "Areas":[
 
             ],
             "IsDeleted":false,
             "BillOfMaterialsLineItemsCount":3,
             "Order":1,
             "QuoteIds":[
 
             ],
             "LockStatusValue":0,
             "LockStatus":0,
             "ProductCategories":null,
             "IsQuotableTillDateExpired":false
          },
          {
             "AreaId":80137,
             "RevisionId":80039,
             "Name":"node-2-1-1",
             "ParentAreaId":80136,
             "IsBaseArea":false,
             "IsActive":true,
             "Areas":[
 
             ],
             "IsDeleted":false,
             "BillOfMaterialsLineItemsCount":0,
             "Order":1,
             "QuoteIds":[
 
             ],
             "LockStatusValue":0,
             "LockStatus":0,
             "ProductCategories":null,
             "IsQuotableTillDateExpired":false
          },
          {
             "AreaId":80138,
             "RevisionId":80039,
             "Name":"node-2-1-2",
             "ParentAreaId":80136,
             "IsBaseArea":false,
             "IsActive":true,
             "Areas":[
 
             ],
             "IsDeleted":false,
             "BillOfMaterialsLineItemsCount":0,
             "Order":2,
             "QuoteIds":[
 
             ],
             "LockStatusValue":0,
             "LockStatus":0,
             "ProductCategories":null,
             "IsQuotableTillDateExpired":false
          },
          {
             "AreaId":80136,
             "RevisionId":80039,
             "Name":"node2-1",
             "ParentAreaId":80135,
             "IsBaseArea":false,
             "IsActive":true,
             "Areas":null,
             "IsDeleted":false,
             "BillOfMaterialsLineItemsCount":0,
             "Order":1,
             "QuoteIds":[
 
             ],
             "LockStatusValue":0,
             "LockStatus":0,
             "ProductCategories":null,
             "IsQuotableTillDateExpired":false
          },
          {
             "AreaId":80139,
             "RevisionId":80039,
             "Name":"node2-2",
             "ParentAreaId":80135,
             "IsBaseArea":false,
             "IsActive":true,
             "Areas":[
 
             ],
             "IsDeleted":false,
             "BillOfMaterialsLineItemsCount":0,
             "Order":2,
             "QuoteIds":[
 
             ],
             "LockStatusValue":0,
             "LockStatus":0,
             "ProductCategories":null,
             "IsQuotableTillDateExpired":false
          },
          {
             "AreaId":80135,
             "RevisionId":80039,
             "Name":"node2",
             "ParentAreaId":80108,
             "IsBaseArea":false,
             "IsActive":true,
             "Areas":[
                {
                   "AreaId":80136,
                   "RevisionId":80039,
                   "Name":"node2-1",
                   "ParentAreaId":80135,
                   "IsBaseArea":false,
                   "IsActive":true,
                   "Areas":null,
                   "IsDeleted":false,
                   "BillOfMaterialsLineItemsCount":0,
                   "Order":1,
                   "QuoteIds":[
 
                   ],
                   "LockStatusValue":0,
                   "LockStatus":0,
                   "ProductCategories":null,
                   "IsQuotableTillDateExpired":false
                },
                {
                   "AreaId":80139,
                   "RevisionId":80039,
                   "Name":"node2-2",
                   "ParentAreaId":80135,
                   "IsBaseArea":false,
                   "IsActive":true,
                   "Areas":[
 
                   ],
                   "IsDeleted":false,
                   "BillOfMaterialsLineItemsCount":0,
                   "Order":2,
                   "QuoteIds":[
 
                   ],
                   "LockStatusValue":0,
                   "LockStatus":0,
                   "ProductCategories":null,
                   "IsQuotableTillDateExpired":false
                }
             ],
             "IsDeleted":false,
             "BillOfMaterialsLineItemsCount":0,
             "Order":2,
             "QuoteIds":[
 
             ],
             "LockStatusValue":0,
             "LockStatus":0,
             "ProductCategories":null,
             "IsQuotableTillDateExpired":false
          }
       ],
       "IsDeleted":false,
       "IsLocked":false,
       "IsErroneousAfterCopyingQuoted":false,
       "IsHidden":true,
       "IsQuoted":false
    }
 ];

const AreaTreeComponent = (props) => {

    const renderTree = data => {
        let areas = data[0]["Areas"];
        let g = {}
        let id2area = {};
        const ROOT = -1;
        const _buildGraph = (areas) => {
            for (var k in areas){
                let area = areas[k];
                let c = area["AreaId"];
                let p = area["ParentAreaId"];
                p = (p == null) ? ROOT : p;
                if (p in g ) {
                    if (g[p].includes(c)){
                        continue;
                    }
                    g[p].push(c);
                } 
                else g[p] = [c];
                id2area[c] = area;
                let neighbors = area["Areas"];
                if (neighbors && neighbors.length && neighbors.length > 0){
                    _buildGraph(neighbors);
                }
            }
        }   
        const _renderTree = (g, id2area, neighbors) => {
            let out = [];
            for (let k in neighbors){
                let id = neighbors[k];
                let node = id2area[id];
                let out_i = {
                    text: node["Name"],
                    expanded: true,
                    items: null, 
                }
                
                let nextNeighbors = g[id];
                if (nextNeighbors && nextNeighbors.length){
                    out_i["items"] = _renderTree(g, id2area, nextNeighbors);
                }
                out.push(out_i);
            }
            return out;
        }
        _buildGraph(areas);
        const tree =  _renderTree(g, id2area, g[ROOT])
        return tree;
    }

    const onExpandChange = (event) => {
        event.item.expanded = !event.item.expanded;
    
    } 

    const onItemClick = (event) => {
        event.item.selected = !event.item.selected;
        // this.forceUpdate();
    }

    renderTree(stub);
    return ( 
        <div>
        <hr />
        <h3>AreaTreeComponent - Kendo TreeView POC</h3>
        <TreeView
                data={renderTree(stub)}
                expandIcons={true}
                onExpandChange={onExpandChange}
                onItemClick={onItemClick}
                aria-multiselectable={true}
                checkboxes={true}
            />  
        </div> 
    )
};

export default AreaTreeComponent;