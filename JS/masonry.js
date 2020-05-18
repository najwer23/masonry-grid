document.addEventListener('DOMContentLoaded', () => {
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
        let maxWidthContainer = container.getBoundingClientRect().width;
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
           column.style.width = (maxWidthContainer / newNumberOfColumns) - 0.2 + "px";
        }
    }

    // function getScrollbarWidth() {

    //     // Creating invisible container
    //     const outer = document.createElement('div');
    //     outer.style.visibility = 'hidden';
    //     outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    //     outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    //     document.body.appendChild(outer);
      
    //     // Creating inner element and placing it in the container
    //     const inner = document.createElement('div');
    //     outer.appendChild(inner);
      
    //     // Calculating difference between container's full width and the child width
    //     const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
      
    //     // Removing temporary elements from the DOM
    //     outer.parentNode.removeChild(outer);
      
    //     return scrollbarWidth;
      
    //   }

    function displayWindowSize(){
        clearMasonryColumns();
        setWidthForMasonryColumn();
        setItemsInMasonryColumns(columns, items)
    }

    displayWindowSize()
    
    window.addEventListener("resize", displayWindowSize);
    
});