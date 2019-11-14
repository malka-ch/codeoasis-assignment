import React from 'react'

export default function UserItem(props) {
    
    function handleClick(username,e){
        
        props.onClickHandler(username);
        e.preventDefault();
    }
    return (
      
        <li className="list-group-item" onClick={handleClick.bind(this,props.user.username)}>
           
            {props.user.username} <span className="badge"></span>
          </li>
        
    )
}
