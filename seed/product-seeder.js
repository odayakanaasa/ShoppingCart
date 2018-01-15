const Product = require('../models/product');

let products = [
    new Product({
        title: 'Apple - MacBook Pro',
        description: 'The new MacBook Pro is razor-thin, featherlight, and now even faster and more powerful than before. It has the brightest, most colorful Mac notebook display. And it features up to 10 hours of battery life.* It’s a notebook built for the work you do every day. Ready to go anywhere a great idea takes you.',
        price: 1149
    }),
    new Product({
        title: 'Dell - XPS',
        description: 'Perfect portability is assured with this Dell XPS two-in-one laptop. All the data is stored on a 256GB solid-state drive for everyday security, and the 13.3-inch screen produces high-quality images and text for easy use. An Intel Core i7 processor and 16GB of RAM keep this Dell XPS two-in-one laptop running smoothly.',
        price: 1399
    }),
    new Product({
        title: 'Lenovo - Star Wars Special Edition Galactic Empire',
        description: 'Lenovo Star Wars Special Edition Yoga 910 Convertible 2-in-1 Laptop: Where does your loyalty lie? Rebel Alliance or Galactic Empire. Let it be known. The 2-in-1 Yoga 910 can be many things: laptop, tablet, work tool, entertainment hub. Pick a side and pledge your Star Wars™ allegiance today with a special edition Rebel Alliance or Galactic Empire design. With its unique Gorilla® Glass cover, this device is as epic as its namesake. Plus with an efficient 7th-generation Intel Core processor and Intel HD graphics, this notebook packs impressive power into its thin chassis.',
        price: 899
    }),
    new Product({
        title: 'World of Warcraft',
        description: 'You were meant for more. You were meant for epic adventure. Maybe even greatness. To charge your enemies without fear. To live boldly and run with comrades you never knew you had. To experience the impossible. Descend into World of Warcraft and join millions of mighty heroes in an online world of myth, magic and limitless adventure. An infinity of experiences await. Join us.',
        price: 15
    }),
    new Product({
        title: 'Call of Duty: WWII',
        description: ' Call of Duty returns to its roots with Call of Duty: WWII - a breathtaking experience that redefines World War II for a new gaming generation. Land in Normandy on D-Day and battle across Europe through iconic locations in historys most monumental war. Experience classic Call of Duty combat, the bonds of camaraderie, and the unforgiving nature of war against a global power throwing the world into tyranny. Collapse ',
        price: 25
    }),
    new Product({
        title: 'Minecraft',
        description: 'The game involves players creating and destroying various types of blocks in a three dimensional environment. The player takes an avatar that can destroy or create blocks, forming fantastic structures, creations and artwork across the various multiplayer servers in multiple game modes. ',
        price: 15
    }),
    new Product({
        title: 'Dark Souls 3',
        description: 'Developed by Japanese developer FromSoftware, DARK SOULS III is the latest chapter in the DARK SOULS series with its trademark sword and sorcery combat and rewarding action RPG gameplay. Players travel across a wide variety of locations in an interconnected world of unrelenting challenge and deep RPG gameplay as they search for a way to survive the coming apocalypse',
        price: 20
    }),
    new Product({
        title: 'BeatsX',
        description: 'Fit for your life, Beats X earphones are the perfect wireless companion. Experience authentic, clear sound throughout your day with a long battery life. Their unique flex-form cable provides all-day comfort and easy pocket portability.',
        price: 149
    }),
    new Product({
        title: 'Omega Seamaster Diver 300M',
        description: 'Bringing together luxury and performance, Omega has consistently redefined state-of-the art mechanical watchmaking since 1884 - paving the way for precision timepieces that are captivating, inspiring, and beautifully engineered. Omega have been witness to some of mankind’s most historic moments: from having supplied NASA with the Speedmaster Professional which went on to become the first watch worn on the moon during the Apollo space missions, to being the official timekeeper to the Olympic games, witnessing some of sport’s greatest achievements. ',
        price: 2000
    }),
    new Product({
        title: 'Audi A5',
        description: 'The Audi A5 sets standards. The formative design has been modernised and is more chiselled. The redesigned front with the optional Audi Matrix LED headlights which perform the dynamic functions. Technically, the sport coupe is state of the art: In addition to the new body, the Audi A5 impresses with a completely new chassis, high-performance drive technology, innovative infotainment equipment and driver assistance systems.',
        price: 43000
    }),
    new Product({
        title: 'BMW 4 Coupe',
        description: 'It\'s impossible to see the BMW 4 Series Coupe, Convertible and Gran Coupe and not feel their athleticism. Yes, they were born from the iconic 3 Series. But, a sleeker, more aggressive design matched with thrilling power makes each 4 Series model stand out in its own beguiling way.',
        price: 43500
    })
];

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds251807.mlab.com:51807/weppo-shop', { useMongoClient: true });

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        console.log("successfully loaded " + products[i]);
        done++;
        if (done === products.length) {
            console.log("Finished uploading");
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}