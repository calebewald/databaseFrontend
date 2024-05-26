import React, { useState, useEffect, useRef } from 'react';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import SortButton from './SortButton';
import axios from 'axios';
import './DataTable.css';

const DataTable = () => {
  /* a react state hook that tracks tableData. tableData is intialized to
     and empty array, and then the component is rendered. Anytime we want to
     update the information in tableData, we use the setTableData function
     to redefine the state (from an empty array to something else). After          
     happens, every part of the component that uses tableData is re-rendered
     
     Specifically to us, we call setTableData when we have information             
     recieved from the database. seTableData is called which updates         
     tableData which triggers a re-rendereding of the component, displaying        
     our data */
  /*The data displayed in the table */
  const [tableData, setTableData] = useState([]);
  /*Keeps track of which rows have been checked */
  const [checkedItems, setCheckedItems] = useState({});
  /*Controls which modifier (AddButton form, DeleteButton second button) 
  is rendered. Only one can be rendered for now */
  const [currentModifier, setCurrentModifier] = useState("");


  // Function to handle checkbox toggle. This needs to be wrapped inside of another
  // arrow function in order to avoid a component loop, don't know why
  const handleCheckboxChange = (id) => {
    return () => {
      setCheckedItems(prevState => ({
        ...prevState,
        [id]: !prevState[id] // Toggle checked status
      }));
    };
  };
  /* useEffect is a react hook that is used to run code only after a             component has been rendered. So this will only be run after the         
      component has been rendered with the empty array [] state first.*/
  useEffect(() => {
    /* defines the fetchdata function, and then runs it after definition.
        This function is declared as "async" so we can use the "await" keyword
        for the fetchData function. We need the await keyword for fetchData
        because we need to halt code execution until after the HTML get               request is process (axios.get()). If we don't do this, setTableData
        will be called before the HTML get request is processed, and         
        reponse.data will be undefined   
    */
    const fetchData = async () => {
      try {
        const response = await axios.get('https://app-9128d68f-4de5-4b3a-aadb-f37d7534d1f3.cleverapps.io/api/items');
        /*reponse looks like: {tableData, } */
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  /* The component itself some things to note:
        - tableData is our state variable, any time it's updated (using                 
          setTableData), this component has to be re-rendered, because the             
           state of our state variable has been changed. 
        - a combination of the key(), value(), map() functions are used
          to generate the table entries. key() and value() take an input of 
          an object, and return an array of that object's keys/values. map()
          is an array method which takes an input of a function, and returns            
           an array of each element of the input after it has been modified 
          by the input function
        - for example, to establish the table headers, Object.key() is first            
        called on the first row of tableData (tableData[0]). This returns             
        an array of that row's keys, which in our case are ID, Price, Name,           
        etc. After that, the map function is called on this array, with a             
        function that takes each key (table info) and returns an html th              
        element with that key as the data, thus creating the headers*/
  return (
    <div className="container">
      <h1>Table Data</h1>
      <AddButton tableData={tableData} setTableData={setTableData}
        currentModifier={currentModifier} setCurrentModifier={setCurrentModifier} />

      <DeleteButton currentModifier={currentModifier} setCurrentModifier={setCurrentModifier}
        checkedItems={checkedItems} setCheckedItems={setCheckedItems}
        tableData={tableData} setTableData={setTableData} />

      <SortButton tableData={tableData} setTableData={setTableData}
        currentModifier={currentModifier} setCurrentModifier={setCurrentModifier} />
      <table>
        <thead>
          <tr>
            {/* A header for the checkboxes, conditionally rendered */}
            {currentModifier == "DeleteButton" && <th>Delete?</th>}
            {/* Render table headers */}
            {tableData.length > 0 && Object.keys(tableData[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows */}
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/*checkboxes, conditionally rendered*/}
              {currentModifier == "DeleteButton" && <td><input key={rowIndex} type="checkbox" onClick={handleCheckboxChange(tableData[rowIndex].ID)}></input></td>}
              {/* Render table cells */}
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;