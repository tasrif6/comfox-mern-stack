import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us -Ecommerce app"}>
        <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
             This is a preorder based drop shipping e-commerce website where you can find the best products for yourself. We are committed to providing our customers with exceptional service while offering our employees the best training.
              We strive to offer our customers the lowest prices possible on our wide selection of products. We are a team of young, dedicated individuals who are passionate about what we do and are committed to providing the best service possible.
              Our mission is to make online shopping easy, efficient, and enjoyable. We believe in treating our customers like family and go above and beyond to ensure their satisfaction.
          </p>
        </div>
      </div>
    </Layout>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};

export default About
