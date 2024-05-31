import React, { useRef } from 'react'
import axios from 'axios';

const AddButton = ({ tableData, setTableData, currentModifier, setCurrentModifier }) => {
    /*References to inputs in the form. We need them to get their values when
    adding their data to the table */
    const nameInput = useRef(null);
    const priceInput = useRef(null);
    const categoryInput = useRef(null);
    const aisle_numberInput = useRef(null);

    /*Opens or closes the form*/
    const toggleAddButton = (e) => {
        e.preventDefault(); // don't know what this does but chatGPT keeps putting it in event handlers
        setCurrentModifier(currentModifier == "AddButton" ? "" : "AddButton");
    }

    /* function executed when "submit" is clicked. Right now it tries to add the given
    information to the database */
    const handleSubmit = async (tableData, setTableData) => {
        // 
        var newID = 1; var IDArray = [];
        for (var i = 0; i < tableData.length; i++) {
            IDArray.push(tableData[i].ID); // array of all current IDs
        }
        while (IDArray.includes(newID)) {
            newID += 1; // newID will be smallest integer greater than -1 that isn't an ID already
        }
        // TD: add guard clauses, right now any value is accepted
        const newData = {
            ID: newID,
            Name: nameInput.current.value,
            Price: priceInput.current.value,
            Category: categoryInput.current.value,
            Aisle_Number: aisle_numberInput.current.value
        }
        // attempt to send data to the database. TD: add error handling
        await axios.post('https://app-9128d68f-4de5-4b3a-aadb-f37d7534d1f3.cleverapps.io/data', newData)
            .then((reponse) => { console.log(reponse) });
        try {
            // attempt to query the newly updated database, update tableData
            const response = await axios.get('https://app-9128d68f-4de5-4b3a-aadb-f37d7534d1f3.cleverapps.io/api/items');
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        nameInput.current.value = "";
        priceInput.current.value = "";
        categoryInput.current.value = "";
        aisle_numberInput.current.value = "";
    }

    /*The form itself. This is conditionally rendered in the component based on the state of currentModifier */
    const form = (
        <ul>
            <li><label>Name: <input type="text" ref={nameInput} /></label></li>
            <li><label>Price: <input type="text" ref={priceInput} /></label></li>
            <li><label>Category: <input type="text" ref={categoryInput} /> </label></li>
            <li><label>Aisle Number: <input type="text" ref={aisle_numberInput} /></label></li>
            <button type="submit" onClick={() => handleSubmit(tableData, setTableData)}>Submit</button>
        </ul>
    );

    return (
        <div>
            <button onClick={toggleAddButton}>{currentModifier == "AddButton" ? "Hide" : "Add Entry"}</button>
            {/* slick way to conditionally render, && returns right input if left input is truthy,
                so form is returned if currentModifier is true.*/}
            {currentModifier == "AddButton" && form}
        </div>
    );
};

export default AddButton;