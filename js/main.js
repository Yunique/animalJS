/*******Main logic******/
var Animal = {
    constructor: function(color) {
        this.color = color;
        return this;
    },
    sayMyLocation: function(island) {
        // В параметре island приниматеся аргумент с цветом острова
        if (this.color === island) {
            alert('I`m on my place!');
        } else { alert('I`m not on my place!');}
    },
};

var ufo, deer, bat, bat2, deer2, fish;
ufo = Object.create(Animal).constructor('yellow');
deer = Object.create(Animal).constructor('yellow');
bat = Object.create(Animal).constructor('violet');
bat2 = Object.create(Animal).constructor('yellow');
deer2 = Object.create(Animal).constructor('pink');
fish = Object.create(Animal).constructor('pink');

fish.sayMyLocation = function(island) {
    if (island === 'pink' || island === 'yellow' || island === 'violet') {
        alert('I`m not on my place!');
    } else {
        alert('I`m on my place!');
    }
};

/*******Dragging******/
interact('.animal').draggable({
    inertia: true,
    restrict: {
        restriction: ('.ocean'),
    },
    onmove: dragMoveListener,
});

function dragMoveListener(event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

/******Drag and drop*******/
interact('.island').dropzone({
    accept: '.animal',
    overlap: 'center',
    
    ondragenter: function(event) {
        var dropzoneElement = event.target;
        dropzoneElement.classList.add('drop-target');
        
    },
    ondragleave: function(event) {
        event.target.classList.remove('drop-target');
    },
    ondrop: function(event) {
        console.log(event);
    },
});