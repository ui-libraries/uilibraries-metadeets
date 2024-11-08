# UI Libraries site/project meta-details web component
This is a web component that can, at a minimum, add University of Iowa Libraries branding to a site (most probably the footer).

## Goals and assumptions
- This compnent will offer several, minimal branding styles that will connect the site to the [University of Iowa Libraries](https://www.lib.uiowa.edu/).  
- This compnent can optionally pull data specific to the site/project and include that. 
- This first iteration was designed for project sites created in WordPress and Omeka by the [Digital Scholarship & Publishing Studio](https://www.lib.uiowa.edu/studio/).

## Usage
In the site, include the web component tag...

`<uilibraries-metadeets></uilibraries-metadeets>`

### Pull site/project details from JSON file or REST API
`projdeets-id=xxxx`

Where `x` is the id of the project/site details. This example is opinionated and assumes the context of the [Studio](https://www.lib.uiowa.edu/studio/), which project/site details are we pulling from the REST API.

Example:  `<uilibraries-metadeets projdeets-id=2193></uilibraries-metadeets>`

### Select from 5 color schemes that adhere to [UI branding](https://brand.uiowa.edu/) (default: `color-scheme-1`)
`class="color-scheme-x"`

Where `x` is [1...5].

Example:  `<uilibraries-metadeets projdeets-id=2193 class="color-scheme-4"></uilibraries-metadeets>`

### Display no details - just branding
Remove 'projdeets-id' attribute (hides button, also)

Example:  `<uilibraries-metadeets class="color-scheme-4"></uilibraries-metadeets>`

### Have the project/site details expanded on page load (defaults to not expanded)
`class="auto-expanded"`

Example:  `<uilibraries-metadeets projdeets-id=2193 class="color-scheme-4" auto-expanded></uilibraries-metadeets>`

### Hide the button (because perhaps auto-expanded with no recourse to close is desired?)
`class="hide-button"`

Example:  `<uilibraries-metadeets projdeets-id=2193 class="color-scheme-4" auto-expanded></uilibraries-metadeets>`

### Change the button text (default: "Project details")
`button-text="More cool info"`

Example:  `<uilibraries-metadeets projdeets-id=2193 class="color-scheme-4" button-text="More cool info"></uilibraries-metadeets>`