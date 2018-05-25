var Animal = {
    constructor: function(color) {
        this.color = color;
        return this;
    },
    sayMyLocation: function(island) {
        // В параметре island приниматеся аргумент с цветом острова
        if (this.color === island) {
            alert("I`m on my place!")
        } else { alert("I`m not on my place!");}
    }
};

var  ufo, deer, bat, bat2, deer2, fish;
ufo = Object.create(Animal).constructor("yellow");
deer = Object.create(Animal).constructor("yellow");
bat = Object.create(Animal).constructor("violet");
bat2 = Object.create(Animal).constructor("yellow");
deer2 = Object.create(Animal).constructor("pink");
fish = Object.create(Animal).constructor("pink");


fish.sayMyLocation = function(island) {
    if (island === "pink"||island === "yellow"||island === "violet") {
        alert("I`m not on my place!")
    } else {
        alert("I`m on my place!")
    }
};

/*******Dragging******/
interact('.animal')
.draggable({
    inertia: true,
    restrict: {
        restriction: ('.ocean')
        // endOnly: true,
        // elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    // autoScroll: false,
    onmove: dragMoveListener
});

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}


// window.dragMoveListener = dragMoveListener;


/******Drag and drop*******/
interact('.island').dropzone({
    // only accept elements matching this CSS selector
    accept: '.animal',
    // Require a 75% element overlap for a drop to be possible
    overlap: "center",
    
    // listen for drop related events:
    
    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
        
        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        draggableElement.textContent = 'Dragged in';
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.textContent = 'Dragged out';
    },
    ondrop: function (event) {
        event.relatedTarget.textContent = 'Dropped';
        console.log(event);
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
        
    }
    // ,
    //
    // //Отсюда надо вытянуть цвет острова и название элемента который мы перетаскиваем
    // checker: function (dragEvent,         // related dragmove or dragend
    //                    event,             // Touch, Pointer or Mouse Event
    //                    dropped,           // bool default checker result
    //                    dropzone,          // dropzone Interactable
    //                    dropElement,       // dropzone elemnt
    //                    draggable,         // draggable Interactable
    //                    draggableElement) {// draggable element
    //     return dropped}
    /* В объекте dropped похоже находятся данные которые нам нужны,
    dropped.relatedTarget содержит название  объекта (животного),
    которого мы перенесли, а в dropped.target  - куда перенесли*/
});
