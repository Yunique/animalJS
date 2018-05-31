class Animal {
    constructor(color) {
        this.color = color;
    }
    
    sayMyLocation(island) {
        if (this.color === island) {
            alert('I`m on my place!');
        } else { alert('I`m not on my place!');}
    }
}

class Fish extends Animal {
    sayMyLocation(island) {
        if (island !== null) {
            alert('I`m not on my place!');
        } else {
            alert('I`m on my place!');
        }
    }
}

let animals = {
    ufo: new Animal('yellow'),
    deer: new Animal('yellow'),
    bat: new Animal('violet'),
    bat2: new Animal('yellow'),
    deer2: new Animal('pink'),
    fish: new Fish('violet'),
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
    let target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

/******Island dropzone*******/
interact('.island').dropzone({
    accept: '.animal',
    overlap: 'center',
    
    ondragenter: function(event) {
        let dropzoneElement = event.target;
        dropzoneElement.classList.add('drop-target');
    },
    ondragleave: function(event) {
        event.target.classList.remove('drop-target');
    },
    ondrop: function(event) {
        const islandColor = event.target.classList[1];
        const id = event.relatedTarget.id;
        animals[id].sayMyLocation(islandColor);
    },
});

/***********Ocean dropzone ***********/
interact('.ocean').dropzone({
    accept: '.animal',
    overlap: 'center',
    
    ondragleave: function(event) {
        event.target.classList.remove('drop-target');
    },
    ondrop: function(event) {
        const islandColor = null;
        const id = event.relatedTarget.id;
        animals[id].sayMyLocation(islandColor);
    },
});