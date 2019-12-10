'use strict';

{
    let isElementInViewport = el => {
        let scroll = window.scrollY || window.pageYOffset
        let boundsTop = el.getBoundingClientRect().top + scroll
        let viewport = { top: scroll, bottom: scroll + window.innerHeight }
        let bounds = { top: boundsTop, bottom: boundsTop + el.clientHeight }
        return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom)
            || (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
    }

    let elements = []

    new MutationObserver(mutations => {
        mutations = mutations.filter(mutation => elements.push(...Array.from(mutation.addedNodes).filter(node => node.nodeName == 'IMG' && (node.msrc = node.src) && (node.src = '#'))))
        сrawl_items()
    }).observe(document, { childList: true, subtree: true, });

    let сrawl_items = () => {
        elements.forEach((element, index) => {
            if (isElementInViewport(element)) {
                element.src = element.msrc
                delete elements[index];
            }
        });
    }

    window.addEventListener('scroll', сrawl_items);
}


