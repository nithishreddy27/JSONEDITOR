import React, { useEffect, useState } from 'react';
import { demo } from '../lib/demo';
// import demo from '../lib/demo';

// import Tree from 'react-d3-tree';
function YourComponent() {
  const [elements, setElements] = useState([]);
  const [addTo, setAddTo] = useState("root");
  const [dfsTraversal, setDfsTraversal] = useState([]);
  // const [treeData, setTreeData] = useState()
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("elementName").value;
    const value = document.getElementById("elementValue").value;
    const minInt = 1;
    const maxInt = 100000;
    const randomInt = getRandomInt(minInt, maxInt);
    // console.log(randomInt);
    
    // Create a new array instead of directly mutating elements
    const newArr = [...elements, {
      id:randomInt,
      name: name,
      value: value,
      parent: addTo
    }];
    
    setElements(newArr);
    // console.log("name ", name, "value ", value);
  }
const demoData = demo()
  console.log("newArr",demoData["root"]);
  demoData["root"]

  // console.log("demo",demo["root"])
  const downloadJson = () => {
    const data = JSON.stringify(nestedData, null, 2); // Adding spacing for readability
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dfsTraversal.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const nestedData = {};

  function addToNestedData(parent, node) {
    if (!nestedData[parent]) {
      nestedData[parent] = [];
    }

    const newNode = {
      name: node.name,
      value: node.value,
    };

    const children = dfsTraversal.filter(child => child.parent === node.id);
    if (children.length > 0) {
      newNode[node.id] = children.map(child => addToNestedData(node.id, child));
    }

    nestedData[parent].push(newNode);

    return newNode;
  }

  dfsTraversal
    .filter(node => node.parent === 'root')
    .forEach(rootNode => addToNestedData('root', rootNode));


  useEffect(() => {
    // Create a dictionary to store nodes by their IDs for easy access
    const nodeDictionary = {};
    elements.forEach(node => {
      nodeDictionary[node.id] = node;
    });

    // DFS traversal function
    function dfs(nodeId, depth, traversalArray) {
      const node = nodeDictionary[nodeId];
      if (!node) {
        return;
      }
      console.log("inside dfs",node)

      const nodeInfo = {
        name: node.name,
        depth: depth,
        value:node.value,
        id:node.id,
        parent:node.parent
      };
      traversalArray.push(nodeInfo);

      elements
        .filter(childNode => childNode.parent === node.id)
        .forEach(childNode => dfs(childNode.id, depth + 1, traversalArray));
    }

    const traversalResults = [];
    elements
      .filter(node => node.parent === "root")
      .forEach(rootNode => dfs(rootNode.id, 0, traversalResults));

    setDfsTraversal(traversalResults);


    const tree = {
      name: 'Root', // You can customize the root name
      children: traversalResults.map(node => ({
        name: `${node.name} : ${node.value}`,
      })),
    };
    // setTreeData(tree)

  }, [elements]);


  // console.log(dfsTraversal)

  return (
    <div>
      <button className='' onClick={() => { setAddTo("root") }}>Add</button>
     
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Name</label>
          <input type="text" name="name" id="elementName" className='border-2 mx-2 border-black' />
          <label htmlFor="">Value</label>
          <input type="text" name="name" id="elementValue" className='border-2 mx-2 border-black' />
          <button type='submit'>Submit</button>
        </form>
      </div>

      <div>
  <h2 className='mt-10'>DFS Traversal:</h2>
  <ul>
    {dfsTraversal.map((node, index) => (
      <li key={index} style={{ marginLeft: `${node.depth * 20}px` }}>
        {node.name}
        <button className='mx-4'>-</button>
        {/* {console.log("node",node)} */}
          <button onClick={() => { setAddTo(node.id) }}>+</button>
      </li>
    ))}
  </ul>
</div>
<h2 className='mt-10'>JSON Format</h2>
  <ul>
    {dfsTraversal.map((node, index) => (
      <li key={index} style={{ marginLeft: `${node.depth * 20}px` }}>
        <span className=''>
          {node.name} :
          </span>
          <span className='text-red-500'>

           {node.value}
          </span>
        
      </li>
    ))}
  </ul>
  <button onClick={downloadJson} className='mt-10'>Download DFS Traversal as JSON</button>
    </div>
  );
}

export default YourComponent;
