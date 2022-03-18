import React, { useState , useEffect} from 'react';
import Post from './post';
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

   // const [ loading , setLoading ] = useState(true);

  //  const [posts, setPosts] = useState([]);
   // const [loading, setLoading] = useState(true);
   // const [categories , setCategories ] = useState([]);
  //  const [selectedCategory, setSelectedCategory] = useState(null);
   // const [totalPostsNumber, setTotalPostsNumer] = useState(0);
    //const [page, setPage] = useState(1);
    
    useEffect(async () => {
        console.log("loading", loading)
        if(!loading) return;
        const {selectedCategory, actualPage} = data;

        const fetchedPosts = await getPosts(actualPage,2,selectedCategory);
        let fetchedCategories = data.categories;
        if(fetchedCategories.length === 0  )
         fetchedCategories = await categoryService.getCategories();
        // //setTotalPostsNumer(fetchedPosts.totalNumber);
        // console.log("setTotalPostsNumer")
        // //setPosts(fetchedPosts.posts);
        // console.log("posts" , fetchedPosts,  fetchedPosts.totalNumber)
        setData({...data,
            loading:false,
            posts: fetchedPosts.posts,
            totalPostsNumber: fetchedPosts.totalNumber,
            categories: fetchedCategories
        })
        //setCategories(fetchedCategories);
        // console.log("setCategories")

        // //setLoading(false);
        // console.log("setLoading")

         console.log("Set state")
       //  setLoading(false)
    },[data.loading]);


    const updateSelectedCategory = async (category) => {
        console.log(category)
       // setSelectedCategory(category);
       const {selectedCategory, actualPage} = data;

        //const fetchedPosts = await getPosts(actualPage,2,selectedCategory);
        setData({...data, loading:true,selectedCategory:category})
       // setLoading(true);
    }

    // const updatePosts = async () => {
    //     const fetchedPosts = await getPosts(page,2);
    //     setPosts(fetchedPosts);
    //     console.log("Update posts")
    // }

    const updatePage = (pageNumber) => {
       setData({...data, loading:true,actualPage:pageNumber})

      // setLoading(true);
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
                return <Post key={index} post={post}></Post>})
            }  
            <PaginationBar pageCount={Math.ceil(totalPostsNumber/2)} selectedPage={actualPage} onChange={updatePage}/>    
        </>}    
    </>);
}

export default PostsView;