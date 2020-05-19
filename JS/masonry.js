window.onload = function () {
    allItems = document.querySelectorAll(".item");

    function resizeGridItem(item) {
        grid = document.querySelector(".grid");
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        
        item.style.gridRowEnd = "span " + rowSpan;
    }

    function resizeAllGridItems() {
        allItems = document.querySelectorAll(".item");
        for (x = 0; x < allItems.length; x++) {
            resizeGridItem(allItems[x]);
        }
    }

    resizeAllGridItems()
    window.addEventListener("resize", resizeAllGridItems);

}
