import React, { Fragment , useEffect , useState } from 'react';
import { Link , useHistory , useRouteMatch ,withRouter } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import './blogs.css';
import Skeleton from 'react-loading-skeleton';

const apiUrl = process.env.REACT_APP_APP_SERVER_URL;
//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;

const BlogDetails = ({}) => {
    const [fetchingDetails, setFetchingDetails] = useState(false);
    const [blog , setblog] =  useState([]);
	const [comment , setComment] = useState('');
	const [comments , setComments] = useState([]);
	const [similarBlogs , setSimilarBlogs] = useState([]);
	const [beingAdded , setBeingAdded] = useState(false);

	const history =  useHistory();
	let match = useRouteMatch("/blogs/:id");	
	//Mwthos to initiate view profile request
	const viewBlogClicked = (blog)=>{
		console.log(blog);
		history.push("/blogs/"+blog.id);     
		window.location.reload(false);   
	} 
	const addComment =async  () =>{
		let data = {
			comment : comment,
			blog_id :  blog.id
		};
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}else{
			toast.error("Please login to add comment");
			return;
		}
		if(comment.length < 5){
			toast.error("Comment must be atleast five characters long");
			return ;
		}

		try {
			setBeingAdded(true);
			const res = await axios.post(`${apiUrl}blogs/comments` , data);
			console.log("Data recieved" , res.data.data );
			setComments( res.data.data);
			setComment('');
			//
		} catch (err) {
			console.log(err)			
		}finally{
			setBeingAdded(false);
		}
	}
	const handleChange = (event) => {
        setComment(event.target.value);
    };
	const fetchComments= () => {
        if(match?.params?.id && isFinite(match?.params?.id)){
            // we define our url and parameters to be sent along
            let url = apiUrl+'blogs/comments/'+match?.params?.id;
                
            // we use the fetch API to call HERE Maps with our parameters
            return fetch(url )
                // when a response is returned we extract the json data
                .then(response => response.json())
                // and this data we dispatch for processing in locations of teachers
                .then(data =>{
                    setComments(data.data);
                    console.log("We have comments details ", data  );
                })
                .catch(error => console.error(error))
        }

	}
	const fetchSimilarBlogs = () =>{
		if(match?.params?.id && isFinite(match?.params?.id)){
            // we define our url and parameters to be sent along
            let url = apiUrl+'blogs/similar/'+match?.params?.id;
                
            // we use the fetch API to call HERE Maps with our parameters
            return fetch(url )
                // when a response is returned we extract the json data
                .then(response => response.json())
                // and this data we dispatch for processing in locations of teachers
                .then(data =>{
                    setSimilarBlogs(data.data);
                    console.log("We have similar blogs ", data  );
                })
                .catch(error => console.error(error))
        }
	}
    useEffect(()=>{
        if(match?.params?.id && isFinite(match?.params?.id)){
            // we define our url and parameters to be sent along
            let url = apiUrl+'blogs/'+match?.params?.id;
                
            // we use the fetch API to call HERE Maps with our parameters
            fetch(url )
                // when a response is returned we extract the json data
                .then(response => response.json())
                // and this data we dispatch for processing in locations of teachers
                .then(data =>{
                    setblog(data.data);
                    console.log("We have blog details ", data , blog );

					//fetching comments 
					fetchComments();

					//Fetching similar blogs
					fetchSimilarBlogs();
                })
                .catch(error => console.error(error))
        }
		console.log("Blog details ", typeof match?.params?.id ,  isFinite(match?.params?.id));
    }, [])

    return (
        <Fragment> 
            <Navbar />

            <div className="page-content">
        {/* <!-- Page Heading Box ==== --> */}
        <div className="page-banner ovbl-dark" >
            <div className="container">
                <div className="page-banner-entry">
                    <h1 className="text-white">Blog Details </h1>
				 </div>
            </div>
        </div>
		<div className="breadcrumb-row">
			<div className="container">
				<ul className="list-inline">
					<li><a href="#">Home</a></li>
					<li>Blogs </li>
					<li>Blog Details </li>
				</ul>
			</div>
		</div>
		<div className="content-block">
			<div className="section-area section-sp1">
				<div className="container">
					<div className="row">
						{!(blog && Object.keys(blog).length) && (
							<div >
								<Skeleton width={750} height={500} />
								<br/>
								<Skeleton count={6} />
							</div>
						)}
						{/* <!-- Left part start --> */}
						{(blog && Object.keys(blog).length && 
                                    (
						<div className="col-lg-8 col-xl-8" key={blog.id}>
							{/* <!-- blog start --> */}
							<div className="recent-news blog-lg">
								<div className="action-box blog-lg">
									<img src={`https://zubnee.com/uploads/${blog.image}`} alt="" />
								</div>
								<div className="info-bx">
									<ul className="media-post">
										<li><a href="javascript:void(0)"><i className="fa fa-calendar"></i>{( new Date(blog.date) ).toISOString().slice(0, 16).replace('T',' ')}</a></li>
										<li><a href="javascript:void(0)"><i className="fa fa-comments-o"></i>{comments && comments.length  ? comments.length : "No "} Comments</a></li>
									</ul>
									<h5 className="post-title"><a href="javascript:void(0)">{blog.title}</a></h5>
									<p> 
										<span dangerouslySetInnerHTML={{__html: (new Buffer(blog.description, 'base64').toString() ) }} /> 
									</p>
									<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
									<div className="widget_tag_cloud">
										<h6>TAGS</h6>
										<div className="tagcloud"> 
											{(blog.tags && blog.tags.split(" ").map((tag,k)=>(
												<a href="javascript:void(0)" key={k}>{tag}</a> 
											)))}
											
										</div>
									</div>
										
									<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
								</div>
							</div>
							<div className="clear" id="comment-list">
								<div className="comments-area" id="comments">
									<h2 className="comments-title">{comments && comments.length  ? comments.length : "No "} Comments</h2>
									<div className="clearfix m-b20">
										{/* <!-- comment list END --> */}
										<ol className="comment-list">
											{comments && comments.length && comments.map((comment,k)=>(
												<li className="comment" key={k}>
													<div className="comment-body">
														<div className="comment-author vcard"> 
															<img  className="avatar photo" src={mediaBaseUrl+comment.image} alt="" /> 
															<cite className="fn">{comment.name}</cite> 
															<span className="says">says:</span> 
														</div>
														<div className="comment-meta"> 
															<a href="javascript:void(0)">{new Date(comment.date).toLocaleString()}</a> 
														</div>
														<p className="comment">{comment.comment }</p>														
													</div>
												</li>
											))}
											
										</ol>
										{/* <!-- comment list END -->
										<!-- Form --> */}
										<div className="comment-respond" id="respond">
											<h4 className="comment-reply-title" id="reply-title">Leave a Comment </h4>
											<div className="comment-form" id="commentform" method="post">
												<p className="comment-form-comment">
													<label htmlFor="comment">Comment</label>
													<textarea rows="8" style={{textTransform:"unset"}} name="comment" placeholder="Comment" value={comment} onChange={handleChange} id="comment">

													</textarea>
												</p>
												<p className="form-submit">
													<button className="addComment" onClick={()=>addComment()}   >
														{beingAdded && (
															<img src="https://www.electricchoice.com/wp-content/themes/Extra/images/spinner5.gif"
															className="loader"
															/>
														)}
														{!beingAdded && (
															'SUBMIT COMMENT'
														)}
														
													</button>
												</p>
											</div>
										</div>
										{/* <!-- Form --> */}
									</div>
								</div>
							</div>
							</div> ))}

						{/* Similar blogs */}
						<div className="col-lg-4 col-xl-4">
							<aside className="side-bar sticky-top">
								<div className="widget recent-posts-entry">
									<h6 className="widget-title">Similar Blogs</h6>
									<div className="widget-post-bx">
											{!(similarBlogs && similarBlogs.length) && [1,2,3,4,5,6].map((v,k)=>(
												<div className="widget-post clearfix" key={v+"sm"}>
													<div className="ttr-post-media"> 
														<Skeleton width="85" height="56" />
													</div>
													<div className="ttr-post-info">
														<div className="ttr-post-header">
															<h6 className="post-title">
																<Skeleton width={200} />
															</h6>
														</div>
														<ul className="media-post">
															<li>
																<Skeleton width={300} />
															</li>
															<li>
																<Skeleton width={400} />
															</li>
														</ul>
													</div>
												</div>
											))}

										{similarBlogs && similarBlogs.length && similarBlogs.map((s,k)=>(
											<div className="widget-post clearfix" key={k+"sm"}>
												<div className="ttr-post-media"> 
													<img src={`https://zubnee.com/uploads/${s.image}`} width="200" height="143" alt=""/> </div>
												<div className="ttr-post-info">
													<div className="ttr-post-header">
														<h6 className="post-title">
															<a href="javascript:void(0)" onClick={()=>viewBlogClicked(s)}  >{s.title}</a>
														</h6>
													</div>
													<ul className="media-post">
														<li><a href="javascript:void(0)">
															<i className="fa fa-calendar"></i>
															{(new Date(s.date)).toLocaleString()}
															</a>
														</li>
														<li><a href="javascript:void(0)">
															<i className="fa fa-comments-o"></i>
															{s.total_comments && s.total_comments.length ? s.total_comments.length+" " : "No "} 
															Comments</a>
														</li>
													</ul>
												</div>
											</div>
										))}
										
									</div>
								</div>
							</aside>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		<Toaster />
        <Footer />
        </Fragment>
    );
}

export default withRouter(BlogDetails);