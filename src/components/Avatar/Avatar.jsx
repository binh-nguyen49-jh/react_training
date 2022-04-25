import React from 'react';

const Avatar = (props) => (
    <div className="avatar" style={{
        backgroundImage: `url('${props.img_url}')`,
        backgroundColor: "#000000",
        backgroundPosition: '50% 50%',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "50%",
        ...props.style
    }} />
)

export default React.memo(Avatar);
