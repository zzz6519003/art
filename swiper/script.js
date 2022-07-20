const swiper = document.querySelector('#swiper');

const urls = [
    'https://source.unsplash.com/random/1000*1000?sky',
    'https://source.unsplash.com/random/1000*1000?landscape',
    'https://source.unsplash.com/random/1000*1000?ocean',
    'https://source.unsplash.com/random/1000*1000?mountain',
    'https://source.unsplash.com/random/1000*1000?forest',
]

let cardCount = 0;

function appendNewCard() {
    console.log('appending');
    const card = new Card({
        imageUrl: urls[cardCount % 5],
        onDismiss: appendNewCard
    });
    // card.element.style.setProperty('--i', cardCount % 5)
    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    })
}

for (let i = 0; i < 5; i++) {
    appendNewCard();
}