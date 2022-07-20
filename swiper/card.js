class Card {
    constructor({
        imageUrl,
        onDismiss
    }) {
        this.imageUrl = imageUrl;
        this.onDismiss = onDismiss;
        this.#init();
    }

    #startPoint;
    #offsetX;
    #offsetY;

    #init = () => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = this.imageUrl;
        card.append(img);
        this.element = card;
        this.#listenToPointerEvents();
    }

    #listenToPointerEvents = () => {
        this.element.addEventListener('pointerdown', e => {
            const {clientX, clientY} = e;
            this.#startPoint = {x: clientX, y: clientY};
            this.element.style.transition = '';
            document.addEventListener('pointermove', this.#handleMouseMove);
        });

        document.addEventListener('pointerup', this.#handleMouseUp)

        this.element.addEventListener('dragstart', e => {
            e.preventDefault();
        })
    }

    #handleMouseMove = (e) => {
        if (!this.#startPoint) return;
        const {clientX, clientY} = e;
        this.#offsetX = clientX - this.#startPoint.x;
        this.#offsetY = clientY - this.#startPoint.y;

        const rotate = this.#offsetX * 0.1;

        this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;

        if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
            const direction = this.#offsetX > 0 ? 1: -1;
            this.#dismiss(direction);
        }
    }

    #handleMouseUp = (e) => {
        this.#startPoint = null;
        document.removeEventListener('pointermove', this.#handleMouseMove);
        this.element.style.transition = 'transform 0.5s';
        this.element.style.transform = '';
    }

    #dismiss = (direction) => {
        this.#startPoint = null;
        document.removeEventListener('pointerup', this.#handleMouseUp);
        document.removeEventListener('pointermove', this.#handleMouseMove);

        this.element.style.transition = 'transform 1s';
        this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;

        this.element.classList.add('dismissing');
        setTimeout(() => {
            this.element.remove();
        }, 1000);


        if (this.onDismiss) {
            this.onDismiss();
        }
    }

}