window.onload = function () {
    let container = document.querySelector('.masonryContainer');
    let columns = container.querySelectorAll('.masonryColumn');
    let items = container.querySelectorAll('.masonryItem');
    const numberOfColumns = columns.length;
    const minColumnnWidth = 320;

    function getMinHeightElement(arrElements) {
        let itemWithMinHeight = arrElements[0];

        for (let item of arrElements) {
            if (item.style.display !== "none") {
                itemWithMinHeight = itemWithMinHeight.offsetHeight <= item.offsetHeight ? itemWithMinHeight : item;
            }
        } 

        return itemWithMinHeight;   
    }

    function setItemsInMasonryColumns(arrElementsColumns, arrElementsItems) {
        let columnsWithMinHeight; 

        for (let item of arrElementsItems) {
            columnsWithMinHeight = getMinHeightElement(arrElementsColumns);
            columnsWithMinHeight.append(item);
        }
    }

    function clearMasonryColumns() {
        for (let item of columns) {
            item.innerHTML = "";
        }
    }

    function setWidthForMasonryColumn() {
        let maxWidthContainer = container.clientWidth;
        let newNumberOfColumns = numberOfColumns;
        let columnsToHide = 0;

        while ((maxWidthContainer / newNumberOfColumns) < minColumnnWidth) {
            newNumberOfColumns--;
            columnsToHide++;
            if (newNumberOfColumns == 1) {
                break;
            }
        }

        let columnsToShow = numberOfColumns - columnsToHide;

        for (let column of columns) {
            if (columnsToShow > 0) {
                column.style.display = "block";
                columnsToShow--;
            } else {
                column.style.display = "none";
            }
        } 

        for (let column of columns) {
           column.style.width = parseInt((maxWidthContainer / newNumberOfColumns)) - 0.2 + "px";
        }
    }

    function displayWindowSize(){
        clearMasonryColumns();
        setWidthForMasonryColumn();
        setItemsInMasonryColumns(columns, items)
    }

    window.addEventListener("resize", displayWindowSize);
    displayWindowSize();
}