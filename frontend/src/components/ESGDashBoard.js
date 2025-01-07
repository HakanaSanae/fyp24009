import React, { useEffect } from 'react';

function ESGDashBoard ({ account }) {

    useEffect(() => {
        var divElement = document.getElementById('viz1736230714700');                    
        var vizElement = divElement.getElementsByTagName('object')[0];                    
        vizElement.style.width='1016px';
        vizElement.style.height='991px';                    
        var scriptElement = document.createElement('script');                    
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
        vizElement.parentNode.insertBefore(scriptElement, vizElement);       
    }, [])

    return(
        <div class='tableauPlaceholder' id='viz1736230714700' style={{position: 'relative'}}>
        <noscript>
            <a href='#'>
                <img alt='ESGenius ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ES&#47;ESG_17362298565400&#47;Story1&#47;1_rss.png' style='border: none' />
            </a>
        </noscript>
        <object class='tableauViz'  style={{display: 'none'}}>
            <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> 
            <param name='embed_code_version' value='3' /> 
            <param name='site_root' value='' />
            <param name='name' value='ESG_17362298565400&#47;Story1' />
            <param name='tabs' value='no' />
            <param name='toolbar' value='yes' />
            <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ES&#47;ESG_17362298565400&#47;Story1&#47;1.png' /> 
            <param name='animate_transition' value='yes' />
            <param name='display_static_image' value='yes' />
            <param name='display_spinner' value='yes' />
            <param name='display_overlay' value='yes' />
            <param name='display_count' value='yes' />
            <param name='language' value='en-GB' />
        </object>
        </div>
    )
    
}

export default ESGDashBoard;