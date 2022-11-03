import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';

// pages
import Landing from './pages/homePage/Index';
import Services from './pages/homePage/Services';
import WhyUs from './pages/homePage/WhyUs';
import ContactUs from './pages/homePage/ContactUs';
import Login from './pages/homePage/Login';
import Job from './pages/homePage/Job';
import ApplyJob from './pages/homePage/ApplyJob';
import AboutUs from './pages/homePage/AboutUs';
import Mission from './pages/homePage/Mission';
import ScrollToTop from './ScrollToTop';

const AppRoutes = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
	return (
		<>
		<ScrollToTop/>
			<Route exact path='/' component={Landing} />
			<Route exact path='/services' component={Services} />
			<Route exact path='/whyus' component={WhyUs} />
			<Route exact path='/contact' component={ContactUs} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/job' component={Job} />
			<Route exact path='/apply' component={ApplyJob} />
			<Route exact path='/about' component={AboutUs} />
			<Route exact path='/mission' component={Mission} />
		</>
	);
};

export default AppRoutes;