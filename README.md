# UI Libraries site meta-details web component
This is a web component that can, at a minimum, add University of Iowa Libraries branding to a site (most probably the footer).

## Goals
- This compnent will offer several, minimal branding styles that will connect the site to the [University of Iowa Libraries](https://www.lib.uiowa.edu/).  
- This compnent can optionally pull data specific to the site/project and include that. 
- This first iteration was designed for project sites created in WordPress and Omeka by the [Digital Scholarship & Publishing Studio](https://www.lib.uiowa.edu/studio/).

## Use
In the site, include the web component tag...

`<uilibraries-metadeets></uilibraries-metadeets>`

### Additional attributes for the component tag
`projdeets-id`

Description: In the context of the [Studio](https://www.lib.uiowa.edu/studio/), which project/site details are we pulling from the REST API?

Example:  `<uilibraries-metadeets projdeets-id=2193></uilibraries-metadeets>`

### Classes that change the look and feel
`color-scheme-1` ... `color-scheme-5`

Example:  `<uilibraries-metadeets projdeets-id=2193 class="color-scheme-4"></uilibraries-metadeets>`