import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src="https://img.freepik.com/free-photo/people-taking-photos-food_23-2149303524.jpg?size=626&ext=jpg&ga=GA1.1.1961182674.1688020228&semt=ais"
                alt="About Us"
                className="rounded-lg mb-6 w-full"
              />
              <img
                src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M="
                alt="Second Image"
                className="rounded-lg mb-6 w-full"
              />
            </div>
            <div className="md:w-1/2 md:pl-10">
              <p className="text-lg text-gray-700 mb-6 text-justify">
                Welcome to our food app! We are passionate about bringing delicious food and delightful dining experiences to your fingertips. We believe that good food has the power to bring people together, create cherished memories, and satisfy both the body and the soul.
              </p>
              <p className="text-lg text-gray-700 mb-6 text-justify">
                Our journey began with a simple vision: to connect food enthusiasts with a diverse range of culinary options, allowing them to explore and indulge in their gastronomic cravings with ease. With an unwavering commitment to quality and customer satisfaction, we have curated a platform that showcases the best local eateries, trending food trends, and exciting culinary creations.
              </p>
              <p className="text-lg text-gray-700 mb-6 text-justify">
                What sets us apart is our dedication to providing a seamless and personalized food discovery journey. We understand that each individual has unique tastes and preferences, which is why our app offers a wide array of cuisines, from traditional favorites to contemporary delights, catering to every palate.
              </p>
              <p className="text-lg text-gray-700 mb-6 text-justify">
                We take pride in our partnerships with local chefs, restaurants, and food vendors who share our passion for culinary excellence. Each establishment featured on our platform undergoes a thorough vetting process to ensure exceptional quality, hygiene, and authenticity. We believe in supporting local businesses and empowering talented chefs, allowing them to showcase their culinary prowess and creativity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
