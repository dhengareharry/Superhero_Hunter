const SuperHero = (function () {
    const superHeroDetailContainer = document.querySelector('.superhero-detail');
 /* Get query parameters from the URL */
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function renderSuperHeroDetails(data) {
        Common.hideLoader();

        if (!data) {
            superHeroDetailContainer.innerHTML = 'Unable to load the superhero. Please try again!';
            return;
        }

        superHeroDetailContainer.innerHTML = `
            <img src="${data.thumbnail.path}/portrait_incredible.${data.thumbnail.extension}" alt="" />
            <h1>${data.name}</h1>
            <h3>${data.description}</h3>
            <br />
            <div class="power-stats">
                <h4>Comics</h4>
                ${data.comics.items.map(comic => `<div><a href='${comic.resourceURI}'>${comic.name}</a></div>`).join('')}
                <h4>Events</h4>
                ${data.events.items.map(event => `<div><a href='${event.resourceURI}'>${event.name}</a></div>`).join('')}
                <h4>Series</h4>
                ${data.series.items.map(series => `<div><a href='${series.resourceURI}'>${series.name}</a></div>`).join('')}
                <h4>Stories</h4>
                ${data.stories.items.map(story => `<div><a href='${story.resourceURI}'>${story.name}</a></div>`).join('')}
            </div>
        `;
    }

    /* Fetch data of a superhero with character id as 'id' */

    async function fetchSuperHeroData(id) {
        const url = Common.apiUrl;

        try {
            const { data, success } = await Common.apiRequest(`${url}&name=${id}`);

            if (success) {
                renderSuperHeroDetails(data.data.results[0]);
            } else {
                renderSuperHeroDetails(null);
            }
        } catch (error) {
            console.log('error', error);
            renderSuperHeroDetails(null);
        }
    }

    /* Initialize the module */
    function init() {
        const heroId = getQueryParameter('id');
        Common.showLoader();

        fetchSuperHeroData(heroId);
    }

    return {
        init
    };
})();
