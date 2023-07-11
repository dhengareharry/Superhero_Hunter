const Common = (function () {
    const initialUrl = "https://gateway.marvel.com:443/v1/public/characters";
    const apiToken = "1659179700434";
    const publicKey = 'c49abfc194e63b7f880768eaca73a33d';
    const hash = '048cf29e8b55cad228aa2324eca6a521';

    const apiUrl = `${initialUrl}?ts=${apiToken}&apikey=${publicKey}&hash=${hash}`;
    const toastContainer = document.getElementById('toast');
    const FAVOURITES = 'favourites';
    const loader = document.querySelector('.loader');

    function setRandomBackgroundImage() {
        const urls = [
            'https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg',
            'https://hdqwalls.com/wallpapers/avengers-artwork-5k-ba.jpg',
            'https://www.superherodb.com/pictures2/portraits/10/100/1496.jpg',
            'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/05/Captain-America-feature-image-1.jpg'
        ];

        const randomBackgroundImageUrl = urls[Math.floor(Math.random() * urls.length)];

        const html = document.querySelector('html');
        html.style.backgroundImage = `url(${randomBackgroundImageUrl})`;
    }

    function showLoader() {
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    /* Notification handler */
    function showNotification(type, message) {
        if (type === 'error') {
            toastContainer.classList.remove('toast-success');
            toastContainer.classList.add('toast-error');
        } else if (type === 'success') {
            toastContainer.classList.remove('toast-error');
            toastContainer.classList.add('toast-success');
        }
        toastContainer.style.display = 'block';
        toastContainer.innerText = message;

        setTimeout(() => {
            toastContainer.style.display = 'none';
        }, 3000);
    }

    /* Send api Request*/
    async function apiRequest(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            return {
                data,
                success: true,
            };
        } catch (error) {
            console.log('error', error);
            return {
                error: error.message,
                success: false,
            };
        }
    }
/* Adding hero to local Storage */
    function addHeroToFavourites(hero) {
        if (!hero) return;

        const favouritesFromLocalStorage = getFavouriteSuperheroes();
        favouritesFromLocalStorage.push(hero);

        // Save in localstorage
        localStorage.setItem(FAVOURITES, JSON.stringify(favouritesFromLocalStorage));

        showNotification('success', 'Added to favorites');
    }
 /* Removing Hero from local storage */
    function removeHeroFromFavourites(heroId) {
        if (!heroId) return;

        let favouritesFromLocalStorage = getFavouriteSuperheroes();

        favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
            (item) => item.id.toString() !== heroId
        );

        localStorage.setItem(FAVOURITES, JSON.stringify(favouritesFromLocalStorage));

        showNotification('success', 'Removed from favorites');
    }

        /* Getting favouritr Superheroes from the local storage */

    function getFavouriteSuperheroes() {
        return localStorage.getItem(FAVOURITES) ?
            JSON.parse(localStorage.getItem(FAVOURITES)) :
            [];
    }

    function debounce(func, delay) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;

            clearTimeout(timeout);

            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args);
            }, delay);
        };
    }

    setRandomBackgroundImage();

    return {
        apiRequest,
        apiUrl,
        showNotification,
        addHeroToFavourites,
        removeHeroFromFavourites,
        getFavouriteSuperheroes,
        showLoader,
        hideLoader,
        debounce
    };
})();
