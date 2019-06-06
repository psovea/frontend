import React from 'react';
import { Compass } from 'react-feather';
import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sbar">
                 <ul>
                     <li><h2>psovea</h2></li>
                     <li><a href="#">{<Compass />}Region</a></li>
                     <li><a href="#">Options</a></li>
                     <li><a href="#">Something</a></li>
                     <li><a href="#">Something</a></li>
                 </ul> 
            </div>
            

        );
    }
}

export default Sidebar;
