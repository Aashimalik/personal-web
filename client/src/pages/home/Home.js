import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./home.css"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"


export default function Home() {
    // 1. create posts fields
    const [posts, setPosts] = useState([]);

    // 2. get params for query
    const search = useLocation().search;

    // 3. Only do this on mount
    useEffect(() => {

        // - define the async function
        const fetchPosts = async () => {

            // 1. get blogposts by search value
            // get response use axios
            // will make request to : localhost::4000/api/blogposts/search
            // response to : localhost::3000/blogposts
            const res = await axios.get("/blogposts" + search);

            // set posts
            setPosts(res.data);
        }

        // - call the function 
        fetchPosts();
    }, [search]);

    return (
        <>
            {/* <Header /> */}

            <div className="home">
                {posts.length > 0 ?
                    <Posts posts={posts} /> :
                    <div className="notif" >
                        <p>No post of category "{search.split("=")[1]}"</p>
                    </div>}
                <Sidebar />
            </div>
        </>
    )
}
