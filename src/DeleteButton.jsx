import React, { useState } from 'react';
import axios from 'axios';

const DeleteButton = ({ currentModifier, setCurrentModifier, checkedItems, setCheckedItems, tableData, setTableData }) => {

    // toggles delete checkboxes and delete entries button
    const toggleDelete = () => {
        setCurrentModifier(currentModifier == "DeleteButton" ? "" : "DeleteButton");
    }

    /*deletes selected entries */
    /*TD: figure out how to re-query the database to reflect the change
    after the delete entries button is clicked. It isn't as easy as I thought */
    const deleteEntries = async () => {
        var selectedData = [];
        // get all the checked rows from checkItems
        tableData.forEach((obj) => {
            if (Object.keys(checkedItems).includes(obj.ID.toString())) {
                selectedData.push(obj);
            }
        });
        console.log(selectedData);

        // do the deletes with selectedData
        selectedData.forEach((dataRow) => {
            axios.post('https://app-9128d68f-4de5-4b3a-aadb-f37d7534d1f3.cleverapps.io/data/delete', { ID: dataRow.ID });
        })

        try {
            // Re-query the database to get the updated data. This happens too
            // soon for some reason, so the changes aren't reflected
            const response = await axios.get('https://app-9128d68f-4de5-4b3a-aadb-f37d7534d1f3.cleverapps.io/api/items');
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        // reset checkedItems
        setCheckedItems({});
        toggleDelete();
    };


    return (
        <div>
            <button onClick={toggleDelete}>{currentModifier == "DeleteButton" ? "Hide" : "Delete Entry"}</button>
            {/*Conditionally rendered with the same logic as showCheckboxes */}
            {currentModifier == "DeleteButton" && <button onClick={deleteEntries}>Delete Selected</button>}
        </div>
    );
}

export default DeleteButton;