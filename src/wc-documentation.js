const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"></link>

<section class="section has-background-danger-dark">
        <div class="container">
            <div class="px-1 py-1">
                <div class="has-background-info mr-1 p-1"> 
                    <div class="is-large p-4">
                        <!-- Row #1 -->
                        <div class="title has-text-light">
                            Amiibo Finder Documentation
                        </div>
                        
                        <!-- Row #2  -->
                        <div class="box mt-2">
                            <h2 class="subtitle has-text-weight-bold mb-0">
                                Project Requirements
                            </h2>
                            <a href=https://github.com/tonethar/IGME-330-Fall-2022/blob/main/projects/p1-checkpoint-2.md#ii-content-requirements---home-page>https://github.com/tonethar/IGME-330-Fall-2022/blob/main/projects/p1-checkpoint-2.md#ii-content-requirements---home-page</a>
                            <br><br>

                            <h2 class="subtitle has-text-weight-bold mb-0">
                                Resources
                            </h2>
                            <ul>
                                <li>
                                    Font: <a href=https://fonts.googleapis.com/css2?family=Underdog&display=swap>https://fonts.googleapis.com/css2?family=Underdog&display=swap</a>
                                </li>
                                <li>
                                    Brand Icon Source: <a href=http://videogames-fanon.wikia.com/wiki/File:Amiibo_icon.png>http://videogames-fanon.wikia.com/wiki/File:Amiibo_icon.png</a>
                                </li>
                                <li>
                                    Starter Code: <a href=https://github.com/tonethar/IGME-330-Master/blob/master/notes/dogfinder-1.md>https://github.com/tonethar/IGME-330-Master/blob/master/notes/dogfinder-1.md</a>
                                </li>
                                <li>
                                    Adding Favorites Code: <a href=https://github.com/tonethar/IGME-330-Master/blob/master/notes/dogfinder-3.md>https://github.com/tonethar/IGME-330-Master/blob/master/notes/dogfinder-3.md</a>
                                </li>
                                <li>
                                    Local Storage Code:
                                    <ul>
                                        <li>
                                            &emsp;<a href=https://github.com/tonethar/IGME-330-Fall-2022/blob/main/weekly/07A.md>https://github.com/tonethar/IGME-330-Fall-2022/blob/main/weekly/07A.md</a>
                                        </li>
                                        <li>
                                            &emsp;<a href=https://github.com/tonethar/IGME-230-Master/blob/master/notes/web-apps-9.md>https://github.com/tonethar/IGME-230-Master/blob/master/notes/web-apps-9.md</a>
                                        </li>
                                    </ul> 
                                </li>
                                <li>
                                    Bulma Card Code: <a href=https://bulma.io/documentation/components/card/>https://bulma.io/documentation/components/card/</a>
                                </li>
                            </ul>
                            
                            <br>
                            <h2 class="subtitle has-text-weight-bold mb-0">
                                API
                            </h2>
                            API Link: <a href=https://amiiboapi.com>https://amiiboapi.com</a>
                            <br>
                            API Documentation: <a href="https://amiiboapi.com/docs/">https://amiiboapi.com/docs/</a>
                            
                            <br><br>
                            <h2 class="subtitle has-text-weight-bold mb-0">
                                Noteworthy
                            </h2>
                            <ul>
                                <li>
                                    &emsp;Mobile Friendly: This project utilized Bulma styleing to create a "mobile-first" application, most evident in the navigation bar, as in screen resolutions under 1024px, it is replaced with a hamburger menu
                                </li>
                                <li>
                                    &emsp;Coding Standards Met: This project utilizes six ES6 modules and five web components, and all code follows class naming standards
                                </li>
                                <li>
                                    &emsp;User Experience: All page states are communicated to the user through on-screen messages, spinning loading wheels, and bolded fonts
                                </li>
                            </ul>
                            This web application utilizes Bulma styling to create a mobile-friendly interface that easily adapts to all screen sizes and resolutions.  All calls to the API are done using 'fetch()' and 'promises'.
                            
                            <br><br>
                            <h2 class="subtitle has-text-weight-bold mb-0">
                                Grading
                            </h2>
                            Requirements Met:
                            <ul>
                                <li>
                                    &emsp;All required pages - <i>Home, App, Favorites, Documentation</i> - have been completed
                                </li>
                                <li>
                                    &emsp;UI State preservation implementedin on the <i>App</i> page utlizing local storage; search terms are preserved and will be displayed upon returning to the <i>App</i> page
                                </li>
                                <li>
                                    &emsp;Favoriting implemented via local storage
                                </li>
                                <li>
                                    &emsp;At least four web components are utilized
                                </li>
                                <li>
                                    &emsp;Ajax via 'fetch()' utilized for accessing API
                                </li>
                                <li>
                                    &emsp;Cloud saving via firebase for community favorites on the <i>Community</i> page
                                </li>
                                <li>
                                    &emsp;Controls well labeled and positioned
                                </li>
                                <li>
                                    &emsp;Project pages communicate status and errors to the user
                                </li>
                                <li>
                                    &emsp;Embedded font
                                </li>
                            </ul>
                            <br>
                            Above & Beyond:
                            <ul>
                                <li>
                                    &emsp;It is possible to remove favorites from the <i>App</i> page
                                </li>
                                <li>
                                    &emsp;It is possible to remove favorites from the <i>Community</i> page
                                </li>
                                <li>
                                    &emsp;It is possible to add favorites from the <i>Community</i> page
                                </li>
                                <li>
                                    &emsp;Search results are preserved on the <i>App</i> page
                                </li>
                                <li>
                                    &emsp;A fifth web component is utilized in addition to the required four
                                </li>
                            </ul>

                            <br>
                            <h2 class="subtitle has-text-weight-bold mb-0">
                                TO DO
                            </h2>
                            <ol>
                                <li>
                                    Alter the amiibo-card component to display the ammount of community likes when created on the <i>Community</i> page.
                                </li>
                                <li>
                                    Add a new control to the app page that allow the user to switch the search term from the name of the amiibo to either the amiibo's game series or amiibo series.
                                </li>
                                <li>
                                    Improve <i>Community</i> page styling
                                </li>
                                <li>
                                    Improve documentation styling
                                </li>
                                <li>
                                    Improve footer styling
                                </li>
                            </ol>

                            <br>
                            <h2 class="subtitle has-text-weight-bold mb-0">
                                Initial Proposal
                            </h2>
                            This Project makes use of the Amiibo API and allows user to search for specific amiibos by the name of the character, the name of the game series the character is from, or the name of the game series the amiibo is from (yes there is a difference).
                            <br>
                            Planned Interface:<br><img src="images/Final-Concept.PNG" alt="Final Concept">
                            <br><br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

class WCDocumentation extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){ 
        this.render();
    }

    disconnectedCallback(){
        this.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        this.render();
    }

    static get observedAttributes(){
        return;
    }

    render(){
        
    }
}

customElements.define('wc-documentation', WCDocumentation);