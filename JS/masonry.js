// kiedy nie zalezy nam na załadowaniu css do końca:
// document.addEventListener('DOMContentLoaded', () => {
// ale nam zalezy bo mamy obrazki, więc: 
// window.onload = function () {


window.onload = function () {
    var container = document.querySelector('.masonryContainer');
    var columns = container.querySelectorAll('.masonryColumn');
    var items = container.querySelectorAll('.masonryItem');
    var NUMBER_OF_COLUMNS = columns.length;
    var MIN_COLUMN_WIDTH = 320;

    function getMinHeightElement(arrElements) {
        var itemWithMinHeight = arrElements[0];

        for (var i=0; i<arrElements.length; i++) {
            if (arrElements[i].style.display !== "none") {
                itemWithMinHeight = itemWithMinHeight.offsetHeight <= arrElements[i].offsetHeight ? itemWithMinHeight : arrElements[i];
            }
        } 

        return itemWithMinHeight;   
    }

    function setItemsInMasonryColumns(arrElementsColumns, arrElementsItems) {
        var columnsWithMinHeight; 

        for (var i=0; i<arrElementsItems.length; i++) {
            columnsWithMinHeight = getMinHeightElement(arrElementsColumns);
            columnsWithMinHeight.appendChild(arrElementsItems[i]);
        }
    }

    function clearMasonryColumns() {
        for (var i=0; i<columns.length; i++) {
            columns[i].textContent = "";
        }
    }

    function setWidthForMasonryColumn() {
        var maxWidthContainer = container.getBoundingClientRect().width;
        var newNumberOfColumns = NUMBER_OF_COLUMNS;
        var columnsToHide = 0;

        while ((maxWidthContainer / newNumberOfColumns) < MIN_COLUMN_WIDTH) {
            newNumberOfColumns--;
            columnsToHide++;
            if (newNumberOfColumns == 1) {
                break;
            }
        }

        var columnsToShow = NUMBER_OF_COLUMNS - columnsToHide;

        for (var i=0; i<columns.length; i++) {
            if (columnsToShow > 0) {
                columns[i].style.display = "block";
                columns[i].style.width = (maxWidthContainer / newNumberOfColumns) - 0.2 + "px";
                columnsToShow--;
            } else {
                columns[i].style.display = "none";
            }
        } 
    }

    function displayWindowSize(){
        clearMasonryColumns();
        setWidthForMasonryColumn();
        setItemsInMasonryColumns(columns, items)
    }

    displayWindowSize()   
    
    window.onresize = function() {
        displayWindowSize()
   }
};