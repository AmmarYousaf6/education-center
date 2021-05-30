import React, { Fragment , useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

const TermsAndConditions = () => {
    const [sendingMessage, setSendingMessage] = useState(false);
    const [storeInfo , setStoreInfo] =  useState({});
    useEffect(()=>{
        // we define our url and parameters to be sent along
        let url = apiUrl+'settings/';
            
        // we use the fetch API to call HERE Maps with our parameters
        return fetch(url )
            // when a response is returned we extract the json data
            .then(response => response.json())
            // and this data we dispatch for processing in locations of teachers
            .then(data =>{
                console.log("We have settings details " , data.data);
                let objSerialized = [];
                data.data.forEach(d=>{
                    objSerialized[d.key]= d.value
                })
                setStoreInfo(objSerialized);
            })
            .catch(error => console.error(error))

    }, [])
    return (
        <Fragment> 
            <Navbar />

            <div className="page-content bg-white">
        {/* <!-- inner page banner --> */}
        <div className="page-banner ovbl-dark" >
            <div className="container">
                <div className="page-banner-entry">
                    <h1 className="text-white">Blog Details</h1>
				</div>
            </div>
        </div>
		{/* <!-- Breadcrumb row --> */}
		<div className="breadcrumb-row">
			<div className="container">
				<ul className="list-inline">
					<li><a href="#">Home</a></li>
					<li>Blog Details</li>
				</ul>
			</div>
		</div>
		{/* <!-- Breadcrumb row END --> */}
        <div className="content-block">
			<div className="section-area section-sp1">
				<div className="container">
					<div className="row">
						{/* <!-- Left part start --> */}
						<div className="col-lg-8 col-xl-8">
							{/* <!-- blog start --> */}
							<div className="recent-news blog-lg">
								<div className="action-box blog-lg">
									<img src="assets/images/blog/default/thum1.jpg" alt="" />
								</div>
								<div className="info-bx">
									<ul className="media-post">
										<li><a href="#"><i className="fa fa-calendar"></i>May 14 2019</a></li>
										<li><a href="#"><i className="fa fa-comments-o"></i>10 Comment</a></li>
									</ul>
									<h5 className="post-title"><a href="#">Why every startup should adopt Amazon’s Hot Air. Why every startup should adopt Amazon’s Hot Air.</a></h5>
									<p>It is used every day in all types of businesses; Email newsletters, websites, print and online advertisements, presentations, social media updates, flyers, and brochures; the list goes on and on</p>
									<p>David Ogilvy, the advertising legend once said that, On average, five times as many people read the headline as read the body copy. When you have written your headline, you have spent eighty cents out of your dollar." As Ogilvy points out, your headline is the first (and sometimes the only) thing that your audience will read.</p>
									<p>You just need to enter the keyword and select the keyword type to generate a list of 6 title ideas and suggestions. If you’re not satisfied with the results, you can always hit the refresh button to generate a new list of unique titles.</p>
									<p>Once you’ve gotten all the titles and have chosen the best one, the next thing you need to do is to craft a magnetic content. Great content marketers excel at creating content that their readers crave, but even the best struggle with delivering content to the right person at the right time.</p>
									<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
									<div className="widget_tag_cloud">
										<h6>TAGS</h6>
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
									<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
										<h6>SHARE </h6>
										<ul className="list-inline contact-social-bx">
											<li><a href="#" className="btn outline radius-xl"><i className="fa fa-facebook"></i></a></li>
											<li><a href="#" className="btn outline radius-xl"><i className="fa fa-twitter"></i></a></li>
											<li><a href="#" className="btn outline radius-xl"><i className="fa fa-linkedin"></i></a></li>
											<li><a href="#" className="btn outline radius-xl"><i className="fa fa-google-plus"></i></a></li>
										</ul>
									<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
								</div>
							</div>
							<div className="clear" id="comment-list">
								<div className="comments-area" id="comments">
									<h2 className="comments-title">8 Comments</h2>
									<div className="clearfix m-b20">
										{/* <!-- comment list END --> */}
										<ol className="comment-list">
											<li className="comment">
												<div className="comment-body">
													<div className="comment-author vcard"> <img  className="avatar photo" src="assets/images/testimonials/pic1.jpg" alt="" /> <cite className="fn">John Doe</cite> <span className="says">says:</span> </div>
													<div className="comment-meta"> <a href="#">December 02, 2019 at 10:45 am</a> </div>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neqnsectetur adipiscing elit. Nam viae neqnsectetur adipiscing elit.
														Nam vitae neque vitae sapien malesuada aliquet. </p>
													<div className="reply"> <a href="#" className="comment-reply-link">Reply</a> </div>
												</div>
												<ol className="children">
													<li className="comment odd parent">
														<div className="comment-body">
															<div className="comment-author vcard"> <img  className="avatar photo" src="assets/images/testimonials/pic2.jpg" alt="" /> <cite className="fn">John Doe</cite> <span className="says">says:</span> </div>
															<div className="comment-meta"> <a href="#">December 02, 2019 at 10:45 am</a> </div>
															<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
																In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
																ac elementum ligula blandit ac.</p>
															<div className="reply"> <a href="#" className="comment-reply-link">Reply</a> </div>
														</div>
														<ol className="children">
															<li className="comment odd parent">
																<div className="comment-body">
																	<div className="comment-author vcard"> <img  className="avatar photo" src="assets/images/testimonials/pic3.jpg" alt="" /> <cite className="fn">John Doe</cite> <span className="says">says:</span> </div>
																	<div className="comment-meta"> <a href="#">December 02, 2019 at 10:45 am</a> </div>
																	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
																		In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
																		ac elementum ligula blandit ac.</p>
																	<div className="reply"> <a href="#" className="comment-reply-link">Reply</a> </div>
																</div>
															</li>
														</ol>
														{/* <!-- list END --> */}
													</li>
												</ol>
												{/* <!-- list END --> */}
											</li>
											<li className="comment">
												<div className="comment-body">
													<div className="comment-author vcard"> <img  className="avatar photo" src="assets/images/testimonials/pic1.jpg" alt="" /> <cite className="fn">John Doe</cite> <span className="says">says:</span> </div>
													<div className="comment-meta"> <a href="#">December 02, 2019 at 10:45 am</a> </div>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
														In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
														ac elementum ligula blandit ac.</p>
													<div className="reply"> <a href="#" className="comment-reply-link">Reply</a> </div>
												</div>
											</li>
											<li className="comment">
												<div className="comment-body">
													<div className="comment-author vcard"> <img  className="avatar photo" src="assets/images/testimonials/pic2.jpg" alt="" /> <cite className="fn">John Doe</cite> <span className="says">says:</span> </div>
													<div className="comment-meta"> <a href="#">December 02, 2019 at 10:45 am</a> </div>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
														In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
														ac elementum ligula blandit ac.</p>
													<div className="reply"> <a href="#" className="comment-reply-link">Reply</a> </div>
												</div>
											</li>
											<li className="comment">
												<div className="comment-body">
													<div className="comment-author vcard"> <img  className="avatar photo" src="assets/images/testimonials/pic3.jpg" alt="" /> <cite className="fn">John Doe</cite> <span className="says">says:</span> </div>
													<div className="comment-meta"> <a href="#">December 02, 2019 at 10:45 am</a> </div>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
														In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
														ac elementum ligula blandit ac.</p>
													<div className="reply"> <a href="#" className="comment-reply-link">Reply</a> </div>
												</div>
											</li>
										</ol>
										{/* <!-- comment list END --> */}
										{/* <!-- Form --> */}
										<div className="comment-respond" id="respond">
											<h4 className="comment-reply-title" id="reply-title">Leave a Reply <small> <a href="#" id="cancel-comment-reply-link" rel="nofollow">Cancel reply</a> </small> </h4>
											<form className="comment-form" id="commentform" method="post">
												<p className="comment-form-author">
													<label for="author">Name <span className="required">*</span></label>
													<input type="text" value="" name="Author"  placeholder="Author" id="author" />
												</p>
												<p className="comment-form-email">
													<label for="email">Email <span className="required">*</span></label>
													<input type="text" value="" placeholder="Email" name="email" id="email" />
												</p>
												<p className="comment-form-url">
													<label for="url">Website</label>
													<input type="text"  value=""  placeholder="Website"  name="url" id="url" />
												</p>
												<p className="comment-form-comment">
													<label for="comment">Comment</label>
													<textarea rows="8" name="comment" placeholder="Comment" id="comment"></textarea>
												</p>
												<p className="form-submit">
													<input type="submit" value="Submit Comment" className="submit" id="submit" name="submit" />
												</p>
											</form>
										</div>
										{/* <!-- Form --> */}
									</div>
								</div>
							</div>
							{/* <!-- blog END --> */}
						</div>
						{/* <!-- Left part END --> */}
						{/* <!-- Side bar start --> */}
						<div className="col-lg-4 col-xl-4">
							<aside  className="side-bar sticky-top">
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
						</div>
						{/* <!-- Side bar END --> */}
					</div>
				</div>
			</div>
        </div>
    </div>
        <Footer />
        </Fragment>
    );
}

export default TermsAndConditions;