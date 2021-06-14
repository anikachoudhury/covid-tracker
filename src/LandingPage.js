import React from 'react';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landingPage">
            <div className="landingPage_title">
                What is the COVID-19 Tracker?
            </div>
            <div className="landingPage_subtitle">
                <p>It is an accumulation of global Covid-19 data regarding 
                the number of cases, deaths, and recoveries.</p> 
                <p>It was built using the disease.sh API which 
                provides data on current global outbreaks.</p>  
            </div>
            
        </div>
    )
}

export default LandingPage;
