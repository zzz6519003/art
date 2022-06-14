const droppables = document.querySelectorAll('.droppable');
const draggables = document.querySelectorAll('.draggable');

document.addEventListener('dragstart', e => {
    if (e.target.classList.contains('draggable')) {
        e.target.classList.add('dragging');
    }
})

document.addEventListener('dragend', e => {
    if (e.target.classList.contains('draggable')) {
        e.target.classList.remove('dragging');
    }
})

droppables.forEach(droppable => {
    droppable.addEventListener('dragover', e => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        // droppable.append(dragging);
        const frontSib = getClosestFrontSibling(droppable, e.clientY);
        if (frontSib) {
            frontSib.insertAdjacentElement('afterend', dragging);
        } else {
            droppable.prepend(dragging);
        }
    })
})

function getClosestFrontSibling(droppable, draggingY) {
    const siblings = droppable.querySelectorAll('.draggable:not(.dragging)');
    let result;
    for (const sibling of siblings) {
        const box = sibling.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
        if (draggingY >= boxCenterY) {
            result = sibling;
        } else {
            return result;
        }
    }
    return result;
}