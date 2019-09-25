import React, { useState, useEffect} from "react";
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
    let [id2area ,setId2Area] = useState({});
    let [id2Node, setId2Node] = useState({});
    let [tree, setTree] = useState([]);
    const ROOT = -1;

    const buildGraph = (areas) => {
        let g = {};
        let id2area = {};
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
                buildGraph(neighbors);
            }
        }
        return [id2area, g];
    }   

    const renderTree = (g, id2area) => {
        let id2Node = {};
        const _renderTree = (g, id2area, neighbors) => {
            let out = [];
            
            for (let k in neighbors){
                let id = neighbors[k];
                let node = id2area[id];
                let out_i = {
                    text: node["Name"],
                    expanded: true,
                    items: null, 
                    checked: false,
                    id: id,
                    pid: node["ParentAreaId"]
                }
                
                let nextNeighbors = g[id];
                if (nextNeighbors && nextNeighbors.length){
                    out_i["items"] = _renderTree(g, id2area, nextNeighbors);
                }
                out.push(out_i)
                id2Node[id] = out_i;
            }

            return out;
        }
        let tree =  _renderTree(g, id2area, g[ROOT])
        return [tree, id2Node];
    }

    const onExpandChange = (event) => {
        event.item.expanded = !event.item.expanded;
    } 

    const onItemClick = (event) => {
        event.item.selected = !event.item.selected;
    }

    const onCheckChange = (event) => {
        console.log(event.item);
        event.item.checked = !event.item.checked;
        const checkVal = event.item.checked;

        const checkSubtree = (node) => {
            node.checked = checkVal;
            if (node.items && node.items.length > 0){
                for(let i in node.items){
                    checkSubtree(node.items[i]);
                }
            }
        }

        const checkUplevel = node => {
            console.log(node.pid, id2Node)
            if (node.pid == null) return;
            const pnode = id2Node[node.pid];
            const items = pnode.items;
            let allTrue = true;
            for (let i in items){
                if (!items[i].checked){
                    pnode.checked = false;
                    allTrue = false;
                    break;
                }
            }
            if (allTrue){
                pnode.checked = true;
            }
        }
        checkSubtree(event.item);
        checkUplevel(event.item);
    }

    useEffect(() => {
        let data = stub;
        let areas = data[0]["Areas"];
        let [id2area, g] = buildGraph(areas);
        
        let [tree, id2Node] = renderTree(g, id2area);
        setId2Node(id2Node);
        setId2Area(id2area);
        setTree(tree);

    }, []);

    return ( 
        <div>
        <hr />
        <h3>Kendo TreeView</h3>
        <TreeView
                data={tree}
                expandIcons={true}
                onExpandChange={onExpandChange}
                onItemClick={onItemClick}
                onCheckChange={onCheckChange}
                aria-multiselectable={true}
                checkboxes={true}
            />  
        </div> 
    )
};

export default AreaTreeComponent;