import React, { useState , useEffect} from 'react';
import Post from './Post';
import {getPosts} from '../Services/posts';
import {Spinner} from 'react-bootstrap'
import PaginationBar from './Basic/PaginationBar';
import * as categoryService from '../Services/categories'
import CategorySelect from './Basic/CategorySelect';
function PostsView() {


    console.log("Render PostsView")

    const [data, setData ] = useState({
        loading: true,
        posts: [],
        totalPostsNumber: 0,
        categories: [], 
        selectedCategory: null,
        actualPage: 1,
    })

    useEffect(async () => {
        if(!loading) return;
        const {selectedCategory, actualPage} = data;

        const fetchedPosts = await getPosts(actualPage,2,selectedCategory);
        let fetchedCategories = data.categories;
        if(fetchedCategories.length === 0  )
         fetchedCategories = await categoryService.getCategories();

        setData({...data,
            loading:false,
            posts: fetchedPosts.posts,
            totalPostsNumber: fetchedPosts.totalNumber,
            categories: fetchedCategories
        })

    },[data.loading]);


    const updateSelectedCategory = async (category) => {
        setData({...data, loading:true,actualPage:1,selectedCategory:category})
    }


    const updatePage = (pageNumber) => {
       setData({...data, loading:true,actualPage:pageNumber})
    }

    const {posts, categories, totalPostsNumber,loading, selectedCategory, actualPage} = data;
    console.log(totalPostsNumber, loading, data)
    return ( <>
        
        <CategorySelect categories={categories} selectedCategory={selectedCategory} onSelect={updateSelectedCategory}/>

        {loading ? 
            <div className=" mt-3 text-center">
                <Spinner animation="border" />
            </div>
        : 
        <>
            {
                posts.map((post,index) => {
                    return <Post key={index} post={post}></Post>
                })
            }  
            <PaginationBar pageCount={Math.ceil(totalPostsNumber/2)} selectedPage={actualPage} onChange={updatePage}/>    
        </>}    
    </>);
}

export default PostsView;