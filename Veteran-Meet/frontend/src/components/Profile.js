import React from 'react';

function renderOrg(orgs){
    return(
        orgs.organisations.map((org) => {
            <div>
                <div>{org.name}</div>
                <div>{org.about}</div>
                <div>{org.image}</div>
            </div>
        })
    );
}
function Profile(props) {
    const hobbies = props.veteran.hobbies.map((hobby) => {
        return (
            <span className="col-12 col-md-5 ml-1">
                {hobby}
            </span>
        );
    });
    return(
        <div className="container">
            <div className="row align-items-start">
                <div>This is the user profile</div>
                <div className="col-12 col-md m-1">
                    {props.veteran.name}    
                </div>
                <div className="col-12 col-md-3 m-1">{props.veteran.stars}</div>
                <div>{hobbies}</div>
                <div className="col-12 col-md m-1">
                    <renderOrg orgs={props.veteran.organisations} />
                </div>                        
            </div>
        </div>
    );
}
export default Profile;