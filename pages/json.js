import React, { useState } from 'react';
// import './App.css';

function App() {
  const [jsonObject, setJsonObject] = useState({});

  const handleAddObject = () => {
    const key = prompt('Enter object key:');
    const value = prompt(`Enter value for key "${key}":`);
    
    if (key && value !== null) {
      setJsonObject({
        ...jsonObject,
        [key]: value,
      });
    }
  };

  const handleEditArrayObject = (arrayKey, index) => {
    const newKey = prompt(`Enter new key for object at index ${index}:`);
    const newValue = prompt(`Enter new value for key "${newKey}":`);
    
    if (newKey && newValue !== null) {
      const newArray = [...jsonObject[arrayKey]];
      newArray[index] = { [newKey]: newValue };
      
      setJsonObject({
        ...jsonObject,
        [arrayKey]: newArray,
      });
    }
  };
  

  const handleAddArray = () => {
    const key = prompt('Enter array key:');
    const isArrayObject = window.confirm(`Is the value an object?`);
    
    if (key !== null) {
      if (isArrayObject) {
        const objectKey = prompt(`Enter object key:`);
        const objectValue = prompt(`Enter value for key "${objectKey}":`);
        setJsonObject({
          ...jsonObject,
          [key]: [{ [objectKey]: objectValue }],
        });
      } else {
        const valuesString = prompt(`Enter values separated by commas:`);
        const values = valuesString.split(',').map(value => value.trim());
        setJsonObject({
          ...jsonObject,
          [key]: values,
        });
      }
    }
  };


  const handleAddToArrayObject = (arrayKey) => {
    const newObjectKey = prompt(`Enter new object key:`);
    const newObjectValue = prompt(`Enter new object value for key "${newObjectKey}":`);
    
    if (newObjectKey && newObjectValue !== null) {
      const newArray = [
        ...jsonObject[arrayKey],
        { [newObjectKey]: newObjectValue },
      ];
      
      setJsonObject({
        ...jsonObject,
        [arrayKey]: newArray,
      });
    }
  };
  
  
  const handleDeleteFromArrayObject = (arrayKey, index) => {
    const newArray = jsonObject[arrayKey].filter((_, i) => i !== index);
    
    setJsonObject({
      ...jsonObject,
      [arrayKey]: newArray,
    });
  };
  

  const handleAddKeyValueToObject = (arrayKey, objectIndex) => {
    const newKey = prompt(`Enter new key for the object:`);
    const newValue = prompt(`Enter new value for key "${newKey}":`);
    
    if (newKey && newValue !== null) {
      const newArray = [...jsonObject[arrayKey]];
      const updatedObject = {
        ...newArray[objectIndex],
        [newKey]: newValue,
      };
      newArray[objectIndex] = updatedObject;
      
      setJsonObject({
        ...jsonObject,
        [arrayKey]: newArray,
      });
    }
  };
  

  const downloadJsonFile = () => {
    const data = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJsonToClipboard = () => {
    const data = JSON.stringify(jsonObject, null, 2);
    navigator.clipboard.writeText(data)
      .then(() => {
        console.log('JSON data copied to clipboard');
      })
      .catch(err => {
        console.error('Error copying JSON data to clipboard:', err);
      });

  };
  const handleEditKeyValue = (arrayKey, objectIndex, key) => {
  const newValue = prompt(`Enter new value for key "${key}":`);
  if (newValue !== null) {
    const newArray = [...jsonObject[arrayKey]];
    newArray[objectIndex] = {
      ...newArray[objectIndex],
      [key]: newValue,
    };
    setJsonObject({
      ...jsonObject,
      [arrayKey]: newArray,
    });
  }
};


const handleEditKeyName = (oldKey) => {
  const newKey = prompt(`Enter new key name for "${oldKey}":`);
  
  if (newKey !== null) {
    const { [oldKey]: oldKeyValue, ...rest } = jsonObject;
    setJsonObject({
      ...rest,
      [newKey]: oldKeyValue,
    });
  }
};
const handleEditValue = (key) => {
  const newValue = prompt(`Enter new value for key "${key}":`);
  
  if (newValue !== null) {
    setJsonObject({
      ...jsonObject,
      [key]: newValue,
    });
  }
};

const handleDeleteKeyValue = (arrayKey, objectIndex, key) => {
  const newArray = [...jsonObject[arrayKey]];
  delete newArray[objectIndex][key];
  setJsonObject({
    ...jsonObject,
    [arrayKey]: newArray,
  });
};

const handleAddKeyValueToArrayObject = (arrayKey, objectIndex) => {
  const newKey = prompt(`Enter new key for the object:`);
  const newValue = prompt(`Enter new value for key "${newKey}":`);
  
  if (newKey && newValue !== null) {
    const newArray = [...jsonObject[arrayKey]];
    newArray[objectIndex] = {
      ...newArray[objectIndex],
      [newKey]: newValue,
    };
    setJsonObject({
      ...jsonObject,
      [arrayKey]: newArray,
    });
  }
};



const handleEditObject = (arrayKey, objectIndex) => {
  const newObjectKey = prompt(`Enter new object key:`);
  const newObjectValue = prompt(`Enter new object value for key "${newObjectKey}":`);
  
  if (newObjectKey && newObjectValue !== null) {
    const newArray = [...jsonObject[arrayKey]];
    newArray[objectIndex] = {
      [newObjectKey]: newObjectValue,
    };
    setJsonObject({
      ...jsonObject,
      [arrayKey]: newArray,
    });
  }
};

const handleDeleteObject = (arrayKey, objectIndex) => {
  const newArray = jsonObject[arrayKey].filter((_, index) => index !== objectIndex);
  setJsonObject({
    ...jsonObject,
    [arrayKey]: newArray,
  });
};

  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">JSON Creator</h1>
      <div className="space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleAddObject}
        >
          Add Object
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          onClick={handleAddArray}
        >
          Add Array
        </button>
        
      </div>
      <div>
      {Object.entries(jsonObject).map(([key, value], arrayIndex) => (
  <div key={key} className="my-4 border p-4 rounded">
    <h2 className="text-lg font-semibold">
      {key}
      <button onClick={() => handleEditKeyName(key)}>Edit Name</button>
    </h2>
    {Array.isArray(value) ? (
      <div>
        {value.map((item, itemIndex) => (
          <div key={itemIndex} className="mt-2">
            {Object.entries(item).map(([itemKey, itemValue]) => (
              <div key={itemKey} className="flex items-center space-x-2">
                <span>{itemKey}: {itemValue}</span>
                <button onClick={() => handleEditKeyValue(key, itemIndex, itemKey)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteKeyValue(key, itemIndex, itemKey)}>
                  Delete
                </button>
              </div>
            ))}
            <button onClick={() => handleAddKeyValueToArrayObject(key, itemIndex)}>
              Add Key-Value
            </button>
          </div>
        ))}
        <button onClick={() => handleAddToArrayObject(key)}>Add Object</button>
      </div>
    ) : (
      <div>
        <span>{value}</span>
        <button onClick={() => handleEditValue(key)}>Edit Value</button>
      </div>
    )}
  </div>
))}





      </div>
      <pre className="mt-8 p-4 bg-white border rounded max-w-2xl overflow-x-auto">
        {JSON.stringify(jsonObject, null, 2)}
      </pre>
      <button
  className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
  onClick={downloadJsonFile}
>
  Download JSON
</button>

<button
  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
  onClick={copyJsonToClipboard}
>
  Copy JSON to Clipboard
</button>


    </div>
  );
}

export default App;
