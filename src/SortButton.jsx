import React, { useRef } from 'react';
/*TD: figure out how to format this and the other buttons properly in App, they look bad right now */

const SortButton = ({ tableData, setTableData, currentModifier, setCurrentModifier }) => {
    /*The option to sort by */
    const sortOption = useRef(null);

    const toggleSortButton = (e) => {
        setCurrentModifier(currentModifier == "SortButton" ? "" : "SortButton");
        e.innerHTML = currentModifier == "SortButton" ? "Hide" : "Sort Data";
    }

    const handleSortSubmission = () => {
        switch (sortOption.current.value) {
            case "sortByID":
                sortData("ID");
                break;
            case "sortByName":
                sortData("Name");
                break;
            case "sortByPrice":
                sortData("Price");
                break;
            case "sortByCategory":
                sortData("Category");
                break;
            case "sortByAisle_Number":
                sortData("Aisle_Number");
                break;
            default:
                // do nothing
                break;
        }
        setCurrentModifier("");
    }

    /*Sorts tableData by sortKey */
    const sortData = (sortKey) => {
        // localeCompare is good for strings comparisons
        if (["Aisle_Number", "Price", "ID"].includes(sortKey)) {
            setTableData(tableData.sort((a, b) => a[sortKey] - b[sortKey]));
        }
        if (["Name", "Category"].includes(sortKey)) {
            setTableData(tableData.sort((a, b) => a[sortKey].localeCompare(b[sortKey])));
        }
    }

    return (
        <div>
            <button onClick={toggleSortButton}>{currentModifier == "SortButton" ? "Hide" : "Sort Data"}</button>
            {currentModifier == "SortButton" &&
                <div>
                    <button onClick={handleSortSubmission}>Go</button>
                    <label value="options">Sort Options: </label>
                    <select id="options" ref={sortOption} name="options">
                        <option value="sortByID">Sort By ID (default) </option>
                        <option value="sortByName">Sort By Name</option>
                        <option value="sortByPrice">Sort By Price</option>
                        <option value="sortByCategory">Sort By Category (alphabetical)</option>
                        <option value="sortByAisle_Number">Sort By Aisle Number</option>
                    </select>
                </div>}
        </div>
    );
}

export default SortButton;