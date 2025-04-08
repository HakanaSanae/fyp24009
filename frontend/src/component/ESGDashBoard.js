import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ESGDashBoard () {

    const location = useLocation();
    const pathName = location.pathname.split('/')[2]; // Get the path name from the URL

    const path = {
        'Overall-ESG-Performance' : '', 
        'YOY-ESG-Change': 'shared/J9HFCZPMS', 
        'Sector-Wise-ESG-Performance': 'shared/8623594D7', 
        'ESG-Score-Breakdown' : 'shared/SKDJ4QCB2', 
        'ESG-Score-Distribution': 'shared/R62RSMP7K', 
        'Custom-Comparison' : 'shared/4393JMNFQ'
    }

    const componentPath = path[pathName]; 
    console.log(componentPath); // Log the component path to the console

    useEffect(() => {
        var divElement = document.getElementById('viz1744115478583');                    
        var vizElement = divElement.getElementsByTagName('object')[0];                    
        vizElement.style.width='1016px';
        vizElement.style.height='991px';                    
        var scriptElement = document.createElement('script');                    
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
        vizElement.parentNode.insertBefore(scriptElement, vizElement);       
    }, [])

    return(
        <div className='tableauPlaceholder' id='viz1744115478583' style={{position: 'relative', margin: '30px 0px'}}>
            <noscript>
            <a href='#'>
                <img alt='ESGenius Data Dashboard ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ES&#47;ESG_final&#47;Story1&#47;1_rss.png' style={{border: 'none'}}/>
            </a>
            </noscript>
            <object className='tableauViz'  style={{display: 'none'}}>
                <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> 
                <param name='embed_code_version' value='3' /> 
                <param name='site_root' value='' />
                <param name='name' value='ESG_final&#47;Story1' />
                <param name='path' value={componentPath}/> 
                <param name='tabs' value='no' />
                <param name='toolbar' value='yes' />
                <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ES&#47;ESG_final&#47;Story1&#47;1.png' /> 
                <param name='animate_transition' value='yes' />
                <param name='display_static_image' value='yes' />
                <param name='display_spinner' value='yes' />
                <param name='display_overlay' value='yes' />
                <param name='display_count' value='yes' />
                <param name='language' value='zh-TW' />
            </object>
        </div>
    )

   
}

export default ESGDashBoard;