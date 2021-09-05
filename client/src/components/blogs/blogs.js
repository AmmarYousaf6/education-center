import React, { Fragment , useEffect , useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import './blogs.css';
import Skeleton from 'react-loading-skeleton';

const apiUrl = process.env.REACT_APP_APP_SERVER_URL;


const Blogs = () => {
    const [sendingMessage, setSendingMessage] = useState(false);
    const [blogs , setblogs] =  useState([]);

	const history = useHistory();

    useEffect(()=>{
        // we define our url and parameters to be sent along
        let url = apiUrl+'blogs/';
            
        // we use the fetch API to call HERE Maps with our parameters
        return fetch(url )
            // when a response is returned we extract the json data
            .then(response => response.json())
            // and this data we dispatch for processing in locations of teachers
            .then(data =>{
                setblogs(data.data);
                console.log("We have bdlogs details ", data , blogs );

            })
            .catch(error => console.error(error))

    }, []);

	const CardSkeleton = ()=>{
		return (
			<div className="post action-card col-xl-4 col-lg-4 col-md-12 col-xs-12 m-b40 h-100">
				<div className="recent-news">
					<div className="action-box">
						<Skeleton width={360} height={240} />
					</div>
					<div className="info-bx">
						<ul className="media-post">
							<Skeleton  />
							<br />
							<Skeleton height={30} />
						</ul>
						<h3><Skeleton  /></h3>						
						<div className="post-extra">
							<Skeleton  />
						</div>
					</div>
				</div>
			</div>
		)
	};
	//Mwthos to initiate view profile request
	const viewBlogClicked = (blog)=>{
        history.push("/blogs/"+blog.id);        
    } 
    return (
        <Fragment> 
            <Navbar />

            <div className="page-content">
        {/* <!-- Page Heading Box ==== --> */}
        <div className="page-banner ovbl-dark" style={{"backgroundImage":"url(assets/images/banner/banner2.jpg)"}}>
            <div className="container">
                <div className="page-banner-entry">
                    <h1 className="text-white">Blogs </h1>
				 </div>
            </div>
        </div>
		<div className="breadcrumb-row">
			<div className="container">
				<ul className="list-inline">
					<li><a href="#">Home</a></li>
					<li>Blogs </li>
				</ul>
			</div>
		</div>
		{/* <!-- Page Heading Box END ==== --> */}
		{/* <!-- Page Content Box ==== --> */}
		<div className="content-block">
            {/* <!-- About Us ==== --> */}
			
			{/* <!-- About Us END ==== --> */}
            {/* <!-- Our Story ==== --> */}
			<div className="content-block">
			<div className="section-area section-sp1">
				<div className="container">
					<div className="row">
						{!(blogs && blogs.length) && [1,2,3,4,5,6,7,8,9].map((k,v)=>(
								<CardSkeleton key={v} />
						))}

						<div className="col-lg-8 col-xl-8 col-md-7">
							<div id="masonry" className="ttr-blog-grid-3 row">
								{(blogs && blogs.length && blogs.map((b , k)=>
                                    (<div key={k} className="post action-card col-xl-6 col-lg-6 col-md-12 col-xs-12 m-b40 h-100">
									<div className="recent-news">
										<div className="action-box">
											<img src={`https://zubnee.com/uploads/${b.image}`} alt="" />
										</div>
										<div className="info-bx">
											<ul className="media-post">
												<li><a href="javascript:void(0)"><i className="fa fa-calendar"></i>{b.date}</a></li>
												<br />
												<li><a href="javascript:void(0)" onClick={()=>viewBlogClicked(b)}><i className="fa fa-user"></i>{b.title}</a></li>
											</ul>
											<h3>{b.title}</h3>
                                            {/* <div dangerouslySetInnerHTML={{__html: (new Buffer(b.description, 'base64').toString() ) }} /> */}
											
                                            <div className="post-extra">
												<a href="javascript:void(0)" className="btn-link" onClick={()=>viewBlogClicked(b)}>READ MORE</a>
											</div>
										</div>
									</div>
								    </div>)
                                )
                                )}
                                	
								
							</div>
							{/* <div className="pagination-bx rounded-sm gray clearfix">
								<ul className="pagination">
									<li className="previous"><a href="#"><i className="ti-arrow-left"></i> Prev</a></li>
									<li className="active"><a href="#">1</a></li>
									<li><a href="#">2</a></li>
									<li><a href="#">3</a></li>
									<li className="next"><a href="#">Next <i className="ti-arrow-right"></i></a></li>
								</ul>
							</div> */}
						</div>
						{/* <div className="col-lg-4 col-xl-4 col-md-5 sticky-top">
							<aside className="side-bar sticky-top">
								<div className="widget">
									<h6 className="widget-title">Search</h6>
									<div className="search-bx style-1">
										<form role="search" method="post">
											<div className="input-group">
												<input name="text" className="form-control" placeholder="Enter your keywords..." type="text" />
												<span className="input-group-btn">
													<button type="submit" className="fa fa-search text-primary"></button>
												</span> 
											</div>
										</form>
									</div>
								</div>
								<div className="widget recent-posts-entry">
									<h6 className="widget-title">Recent Posts</h6>
									<div className="widget-post-bx">
										<div className="widget-post clearfix">
											<div className="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic1.jpg" width="200" height="143" alt="" /> </div>
											<div className="ttr-post-info">
												<div className="ttr-post-header">
													<h6 className="post-title"><a href="blog-details.html">This Story Behind Education Will Haunt You Forever.</a></h6>
												</div>
												<ul className="media-post">
													<li><a href="#"><i className="fa fa-calendar"></i>Oct 23 2019</a></li>
													<li><a href="#"><i className="fa fa-comments-o"></i>15 Comment</a></li>
												</ul>
											</div>
										</div>
										<div className="widget-post clearfix">
											<div className="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic2.jpg" width="200" height="160" alt="" /> </div>
											<div className="ttr-post-info">
												<div className="ttr-post-header">
													<h6 className="post-title"><a href="blog-details.html">What Will Education Be Like In The Next 50 Years?</a></h6>
												</div>
												<ul className="media-post">
													<li><a href="#"><i className="fa fa-calendar"></i>May 14 2019</a></li>
													<li><a href="#"><i className="fa fa-comments-o"></i>23 Comment</a></li>
												</ul>
											</div>
										</div>
										<div className="widget-post clearfix">
											<div className="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic3.jpg" width="200" height="160" alt="" /> </div>
											<div className="ttr-post-info">
												<div className="ttr-post-header">
													<h6 className="post-title"><a href="blog-details.html">Eliminate Your Fears And Doubts About Education.</a></h6>
												</div>
												<ul className="media-post">
													<li><a href="#"><i className="fa fa-calendar"></i>June 12 2019</a></li>
													<li><a href="#"><i className="fa fa-comments-o"></i>27 Comment</a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="widget widget-newslatter">
									<h6 className="widget-title">Newsletter</h6>
									<div className="news-box">
										<p>Enter your e-mail and subscribe to our newsletter.</p>
										<form className="subscription-form" action="http://educhamp.themetrades.com/demo/assets/script/mailchamp.php" method="post">
											<div className="ajax-message"></div>
											<div className="input-group">
												<input name="dzEmail" required="required" type="email" className="form-control" placeholder="Your Email Address"/>
												<button name="submit" value="Submit" type="submit" className="btn black radius-no">
													<i className="fa fa-paper-plane-o"></i>
												</button>
											</div>
										</form>
									</div>
								</div>
								<div className="widget widget_gallery gallery-grid-4">
									<h6 className="widget-title">Our Gallery</h6>
									<ul>
										<li><div><a href="#"><img src="assets/images/gallery/pic2.jpg" alt="" /></a></div></li>
										<li><div><a href="#"><img src="assets/images/gallery/pic1.jpg" alt="" /></a></div></li>
										<li><div><a href="#"><img src="assets/images/gallery/pic5.jpg" alt="" /></a></div></li>
										<li><div><a href="#"><img src="assets/images/gallery/pic7.jpg" alt="" /></a></div></li>
										<li><div><a href="#"><img src="assets/images/gallery/pic8.jpg" alt="" /></a></div></li>
										<li><div><a href="#"><img src="assets/images/gallery/pic9.jpg" alt="" /></a></div></li>
										<li><div><a href="#"><img src="assets/images/gallery/pic3.jpg" alt="" /></a></div></li>
										<li><div><a href="#"><img src="assets/images/gallery/pic4.jpg" alt="" /></a></div></li>
									</ul>
								</div>
								<div className="widget widget_tag_cloud">
									<h6 className="widget-title">Tags</h6>
									<div className="tagcloud"> 
										<a href="#">Design</a> 
										<a href="#">User interface</a> 
										<a href="#">SEO</a> 
										<a href="#">WordPress</a> 
										<a href="#">Development</a> 
										<a href="#">Joomla</a> 
										<a href="#">Design</a> 
										<a href="#">User interface</a> 
										<a href="#">SEO</a> 
										<a href="#">WordPress</a> 
										<a href="#">Development</a> 
										<a href="#">Joomla</a> 
										<a href="#">Design</a> 
										<a href="#">User interface</a> 
										<a href="#">SEO</a> 
										<a href="#">WordPress</a> 
										<a href="#">Development</a> 
										<a href="#">Joomla</a> 
									</div>
								</div>
							</aside>
						</div> */}
					</div>
				</div>
			</div>
        </div>
			{/* <!-- Our Story END ==== --> */}
			{/* <!-- Our Status ==== --> */}
			<div className="section-area content-inner section-sp1">
                
            </div>
			{/* <!-- Our Status END ==== --> */}
			{/* <!-- About Content ==== --> */}
			
			{/* <!-- About Content END ==== --> */}
        </div>
		{/* <!-- Page Content Box END ==== --> */}
        </div>
        <Footer />
        </Fragment>
    );
}

export default Blogs;