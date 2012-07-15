/**
 * This script plugs into the node #simple-slideshow and, provided all its child elements are images
 * of the same size, cycles nicely through on mouse click or left/right key press.
 */
/*global document */
(function () {
    "use strict";
    var container = document.getElementById('simple-slideshow'),
        slides = container.children,
        current = slides[0] || null,
        preloadNextSlide = function () {
            if (current.nextElementSibling.getAttribute('src') === null) {
                current.nextElementSibling.setAttribute('src', current.nextElementSibling.getAttribute('data-src'));
            }
        },
        next = function (e) {
            var element = e.target || e,
                nextElement = element.nextElementSibling,
                lastElement = element;
            if (nextElement.getAttribute('src') === null) {
                nextElement.setAttribute('src', nextElement.getAttribute('data-src'));
            }
            container.removeChild(element);
            current = nextElement;
            container.appendChild(lastElement);
            preload();
        },
        previous = function (e) {
            var element = e.currentTarget || e,
                nextElement = slides[slides.length - 1];
            if (nextElement.getAttribute('src') === null) {
                nextElement.setAttribute('src', nextElement.getAttribute('data-src'));
            }
            current = nextElement;
            container.insertBefore(nextElement, element);
        },
        handleKeydown = function (e) {
            if (e.keyCode === 37) {
                previous(current);
            } else if (e.keyCode === 39) {
                next(current);
            }
        },
        handleClick = function (e) {
            next();
        },
        applyStylesToContainer = function () {
            container.style.cursor = 'pointer';
            container.style.height = slides[0].style.offsetHeight;
        },
        applyStylesToSlides = function () {
            var slide;
            for (slide in slides) {
                if (slides.hasOwnProperty(slide)) {
                    if (slides[slide].tagName === 'IMG') {
                        slides[slide].style.display = 'inline';
                    }
                }
            }
        },
        addEventListeners = function () {
            document.body.addEventListener('keydown', handleKeydown);
            container.addEventListener('click', handleClick);
        },
        initialize = function () {
			applyStylesToContainer();
            applyStylesToSlides();
            addEventListeners();
            preloadNextSlide();
        };
    initialize();
}(document));

