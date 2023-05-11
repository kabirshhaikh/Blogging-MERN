    import React, { useEffect } from "react";
    import './Add-Blog.css';
    import { useCookies } from 'react-cookie';
    const AddBlog = () => {
        const [cookies] = useCookies(['token']);

        useEffect(() => {
            const token = cookies.token;
            console.log('Token:', token);
        }, [cookies]);

        return (
            <div>
                Add-Blog Page
            </div>
        );
    }

    export default AddBlog;