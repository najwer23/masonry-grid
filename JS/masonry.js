// kiedy nie zalezy nam na załadowaniu css do końca:
// document.addEventListener('DOMContentLoaded', () => {
// ale nam zalezy bo mamy obrazki, więc: 
// window.onload = function () {


window.onload = function () {
    let container = document.querySelector('.masonryContainer');
    let columns = container.querySelectorAll('.masonryColumn');
    let items = container.querySelectorAll('.masonryItem');
    const NUMBER_OF_COLUMNS = columns.length;
    const MIN_COLUMN_WIDTH = 320;

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
        let maxWidthContainer = container.getBoundingClientRect().width;
        let newNumberOfColumns = NUMBER_OF_COLUMNS;
        let columnsToHide = 0;

        while ((maxWidthContainer / newNumberOfColumns) < MIN_COLUMN_WIDTH) {
            newNumberOfColumns--;
            columnsToHide++;
            if (newNumberOfColumns == 1) {
                break;
            }
        }

        let columnsToShow = NUMBER_OF_COLUMNS - columnsToHide;

        for (let column of columns) {
            if (columnsToShow > 0) {
                column.style.display = "block";
                columnsToShow--;
            } else {
                column.style.display = "none";
            }
        } 

        for (let column of columns) {
           column.style.width = (maxWidthContainer / newNumberOfColumns) - 0.2 + "px";
        }
    }

    function displayWindowSize(){
        clearMasonryColumns();
        setWidthForMasonryColumn();
        setItemsInMasonryColumns(columns, items)
    }

    displayWindowSize()    
    window.addEventListener("resize", displayWindowSize); 
};