import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/router';
import { fetchBlogs } from '@/allApi/apis';


const GohBlog = () => {
  const route=useRouter();
  const [posts, setPosts] = useState([]);

  const allBlog = async () => {
    const data = await fetchBlogs();
    setPosts(data.data);
  };

  useEffect(() => {
    allBlog();
  }, []);

  return (
    <div className="container">
      <h2 className='my-md-5 my-3'><strong>Popular Blog Posts</strong></h2>
      <div className="image-row">
      {posts && posts.map((blog, index) => (
  <a key={index} href={`https://blog.gohoardings.com/${blog.url}`} target="_blank" rel="noopener noreferrer" className="image-container pnt text-decoration-none text-dark">
    <img src={blog.image} alt={blog.url} />
    <p className="card-title mt-2">{blog.title}</p>
  </a>
))}

      </div>
      <style jsx>{`
       
        .image-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .image-container {
          width: calc(33.33% - 20px);
          margin-bottom: 20px;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        a:hover {
          color: #000100 !important;
      }
      .card-title{
        font-size: 16px;
        // color: rgb(57, 55, 55);
        overflow: hidden ;
        text-overflow: ellipsis ;
        display: -webkit-box ;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical ;
        
        }
        @media screen and (max-width: 768px) {
          .image-container {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default GohBlog;
