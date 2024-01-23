import React from 'react';
import Navbar from '../components/Navbar';
import Card from './../components/Card';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.post("https://food-app-mern.onrender.com/api/foodData");
      console.log(response.data.foodItems, response.data.foodCategory);
      setFoodCat(response.data.foodCategory);
      setFoodItems(response.data.foodItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="relative carousel-wrapper">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          interval={3000}
          className="carousel"
        >
          <div>
            <img
              src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
              alt="Slide 1"
              className="w-full h-64 sm:h-96 object-cover"
            />
          </div>
          <div>
            <img
              src="https://wallpaperaccess.com/full/1324879.jpg"
              alt="Slide 2"
              className="w-full h-64 sm:h-96 object-cover"
            />
          </div>
          <div>
            <img
              src="https://wallpapers.com/images/featured/iyvy1e8yztvry3g8.jpg"
              alt="Slide 3"
              className="w-full h-64 sm:h-96 object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?cs=srgb&dl=pexels-robin-stickel-70497.jpg&fm=jpg"
              alt="Slide 4"
              className="w-full h-64 sm:h-96 object-cover"
            />
          </div>
        </Carousel>

        <form className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 flex">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-8 px-4 mr-1 mb-10 bg-white text-black rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="container mx-auto mt-8">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id}>
              <div className="font-mono text-lg m-4 flex">{data.CategoryName}</div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {foodItems.length > 0 ? (
                  foodItems
                    .filter((items) => items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase()))
                    .map((filterItems) => (
                      <div key={filterItems._id}>
                        <Card
                          foodItem={filterItems}
                          foodName={filterItems.name}
                          options={filterItems.options}
                          description={filterItems.description}
                        />
                      </div>
                    ))
                ) : null}
              </div>
            </div>
          ))
        ) :null}
      </div>

      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
}
