const scrapeIt = require("scrape-it");

const scrapAttributes = {
    covers: {
        listItem: '.tcarusel-item.main-news',
        data: {
            text: {
                selector: '.tcarusel-item-title > a'
            },
            cover: {
                selector: '.tcarusel-item-image > a > img',
                attr: 'src'
            },
            info: {
                selector: '.tcarusel-item-image>.tcarusel-item-descr'
            },
            url: {
                selector: '.tcarusel-item-image > a',
                attr: 'href'
            }
        }
    }
}

const scrap = () => {

    return scrapeIt(process.env.SOURCE_URL, scrapAttributes)
        .then((raw = {}) => {
            if (!raw.covers) return [];

            const a = raw.covers.map(e => {
                e.info = e.info
                    .replace(/\n/g, '')
                    .replace(/\s*Quality.*$/g, '')
                    .replace(/\s{2,}/, ' - ');

                e.band = e.text.split(' - ')[0];
                return e;
            });
            return a;
        })
}


module.exports.scrap = scrap;