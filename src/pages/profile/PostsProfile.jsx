import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import axiosInstance from '../../../interceptor';
import { useAuth } from '../../context/AuthContext';

export default function PostsProfile() {
    const [posts, setPosts] = useState();
    const {authUser} = useAuth();
    useEffect(()=>{
        async function fetchPost(){
            const {data} = await axiosInstance.get(`http://localhost:3005/api/v1/usedItem/currentuser/${authUser}`)
            console.log(data);

        }
        fetchPost()

    },[])
  return (
   <>
   <div className='pt-4'>
    <h2 className='font-semibold text-textcolor2 text-xl'>Your Posts</h2>
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {/* {posts.map((post) => {
          return <Card key={post._id} post = {post} />;
        })} */}
      </div>
   </div>
   
   </>
  )
}
