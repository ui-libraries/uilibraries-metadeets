const template = document.createElement('template');

template.innerHTML = `
    <link href="/css/uilibraries-metadeets.css" rel="stylesheet" type="text/css">     
    <div class="metadeets">
        <h3 class="mothership-branding">
            <a class="block-iowa" href="https://uiowa.edu/">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 311.6 90.2" aria-labelledby="metadeets-block-iowa">
                    <title id="metadeets-block-iowa">University of Iowa</title>
                    <path class="block-i" d="M40 18.8h-7.3v52.4H40v19H0v-19h7.3V18.8H0V0h40V18.8z"></path>
                    <path class="block-o" d="M93.8 90.2h-29c-10.5 0-17.4-6.9-17.4-18.2V18.2C47.4 7 54.4 0 64.8 0h29c10.5 0 17.4 7 17.4 18.2V72C111.2 83.2 104.2 90.2 93.8 90.2zM85.6 71.2V18.8H73v52.4H85.6z"></path>
                    <path class="block-w" d="M122.6 18.8h-6.4V0h38v18.9H147l6.5 43.4L167 0h19.2l14.4 62.3 5.2-43.4h-6.6V0h37.5v18.9h-6.2l-11.3 71.4h-30.6l-11.8-53.2 -12.1 53.1h-29.4L122.6 18.8z"></path>
                    <path class="block-a" d="M230.1 71.2h6.9L250.7 0h41l13.5 71.2h6.4v19H281l-2.9-22h-15.2l-2.7 22h-30L230.1 71.2 230.1 71.2zM276.5 51.7l-5.8-36.4 -6 36.4H276.5z"></path>
                    <image src="https://www.lib.uiowa.edu/includes/uids/images/block-iowa-gold.png" />
                </svg>
            </a>
            <a class="uilibraries-link" href="https://lib.uiowa.edu/">University Libraries</a>
        </h3>
        <button id="metadeets-button" class="metadeets__button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg><slot name="button-text"></slot></button>
        <div class="metadeets__summary">
            <slot name="summary"></slot>
        </div>
        <div id="metadeets-container" class="metadeets__container hidden" aria-labelledby="metadeets-button">
            <slot name="title"></slot>
            <slot name="description"></slot>
            <slot name="acknowledgements"></slot>
            <slot name="license"></slot>
        </div>
    </div>
`;

class UILibrariesMetaDetails extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        let clone = template.content.cloneNode(true);
        shadowRoot.append(clone);

        const button = shadowRoot.getElementById('metadeets-button');
        const container = shadowRoot.getElementById('metadeets-container');

        const metadeetsId = this.getAttribute('metadeets-id') ? this.getAttribute('metadeets-id') : false;
        button.setAttribute('id', 'metadeets-button-' + metadeetsId);
        container.setAttribute('id', 'metadeets-container-' + metadeetsId);

        const buttonText = this.getAttribute('button-text') ? this.getAttribute('button-text') : 'Project details';
        
        const containerExpandedOnload = this.classList.contains('auto-expanded');
        button.setAttribute('aria-expanded', containerExpandedOnload);
        container.setAttribute('aria-expanded', containerExpandedOnload);

        if (metadeetsId) {
            button.innerHTML = `<slot name="button-text">${buttonText}</slot> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`;
            button.addEventListener('click', () => {
                const expanded = button.getAttribute('aria-expanded') === 'true' || false;
                button.setAttribute('aria-expanded', !expanded);
                container.setAttribute('aria-expanded', !expanded);
            });
            

            // Fetch data from the API
            const data = this.fetchProjectDetails(metadeetsId);
        } else {
            button.style.display = "none";
        }
    }

    async fetchProjectDetails(metadeetsId) {
        try {
            const response = await fetch(`https://www.lib.uiowa.edu/web/wp-json/wp/v2/projdeets/${metadeetsId}`);
            // const response = await fetch(`/sample-data/${metadeetsId}.json`); // for static demo on GitHub
            const data = await response.json();
          
            // const summarySlot = this.shadowRoot.querySelector('slot[name="summary"]');
            const titleSlot = this.shadowRoot.querySelector('slot[name="title"]');
            const descriptionSlot = this.shadowRoot.querySelector('slot[name="description"]');
            const acknowledgementsSlot = this.shadowRoot.querySelector('slot[name="acknowledgements"]');
            const licenseSlot = this.shadowRoot.querySelector('slot[name="license"]');
    
            // Assign JSON data to slots
            // if (data.project_summary) summarySlot.innerHTML = data.project_summary;
            if (data.title.rendered) titleSlot.innerHTML = `<h2>${data.title.rendered}</h2>`;
            if (data.content.rendered) descriptionSlot.innerHTML = '<h3>Description</h3>' + data.content.rendered;
            if (data.project_credits) acknowledgementsSlot.innerHTML = '<h3>Credits</h3>' + data.project_credits;
            if (data.project_license) licenseSlot.innerHTML = '<h3>License</h3>' + `<em>${data.project_license}</em>`;
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    }
}

customElements.define('uilibraries-metadeets', UILibrariesMetaDetails);
