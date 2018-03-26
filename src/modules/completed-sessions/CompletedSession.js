import React, { Component } from 'react';
import  './style.css'
import Image from '../../assets/completedsessions/ins2.jpg';

class CompletedSession extends Component {
    render() {
        return (
        <div>
            <div className="ins">

                   <div className="ins-dt">
                     <img src={Image} className="ins-img"/>
                        <div className="information">
                         <p className="name">Hassaan Khan</p>
                        <p className="crnt-date">26/March/18</p>                            
                        </div>                            
                    </div>

                    <div className="duration-data">
                        <span className="duration">Duration</span> <p className="st-end-date">26/Mar to 26/Apr</p>
                            
                    </div>

                    <div className="duration-data2">
                        <span className="duration data">Data 2</span> <p className="data-info">Other Details</p>                            
                    </div>

                <button className="view-btn">View</button>
            </div> 

            <div className="ins">

            <div className="ins-dt">
              <img src={Image} className="ins-img"/>
                 <div className="information">
                  <p className="name">Hassaan Khan</p>
                 <p className="crnt-date">26/March/18</p>                            
                 </div>                            
             </div>

             <div className="duration-data">
                 <span className="duration">Duration</span> <p className="st-end-date">26/Mar to 26/Apr</p>
                     
             </div>

             <div className="duration-data2">
                 <span className="duration data">Data 2</span> <p className="data-info">Other Details</p>                            
             </div>

         <button className="view-btn">View</button>
     </div> 

     </div>
        );
    }
}

export default CompletedSession;

