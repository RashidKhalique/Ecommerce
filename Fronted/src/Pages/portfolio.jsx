import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Portfolio = () => {
    return (
        <div className="font-sans">
            {/* Header */}
            <header className="flex justify-between items-center p-4 md:px-12 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-gray-900">Cody</h1>
                <nav className="hidden md:flex space-x-8 text-gray-700">
                    <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
                    <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
                    <a href="#portfolio" className="hover:text-blue-600 transition-colors">Portfolio</a>
                    <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
                </nav>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">Contact Me</button>
            </header>

            {/* Home Section */}
            <section className="flex flex-col md:flex-row items-center justify-between p-12 bg-blue-50">
                <div className="text-center md:text-left md:w-1/2 pt-5">
                    <h1 className="text-4xl font-bold text-gray-900 my-4">Rashid Khalique</h1>
                    <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                        I'm Rashid Khalique, a Web Designer and Developer skilled in WordPress, MERN, HTML/CSS, Bootstrap, and Tailwind CSS, creating visually engaging, optimized websites tailored to client needs, with expertise in UI/UX and responsive design.
                    </p>
                    <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">Hire Me</button>
                </div>
                <div className="md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0">
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D03AQGhYPSmz_u4ZA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730441088583?e=1736985600&v=beta&t=FNV4GiOdfZhHMgU-d-xAwg3p1Ew3Ice3_anfPzWGSmQ"
                        alt="Cody"
                        className="w-72 h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
            </section>

  {/* Logo Section */}
  <section className="bg-white py-12">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">Trusted By</h3>
                </div>
                <div className="flex justify-center space-x-16">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Upwork-logo.svg/2560px-Upwork-logo.svg.png"
                        alt="Upwork"
                        className="h-20"
                    />
                    <img
                        src="https://tariqmajeed.com/wp-content/uploads/2021/09/cropped-tariqmajeed-logo-2021.png"
                        alt="TariQ Majeed"
                        className="h-20"
                    />
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQZZCqnfyOZrs1MC9CPtC7tJWJtwsvjncu-w&s"
                        alt="Fiverr"
                        className="h-20"
                    />
                    <img
                        src="https://www.icreativez.com/icreativezTechnologies-Leading-IT-Company1.png"
                        alt="Icreativez"
                        className="h-20"
                    />
                </div>
            </section>


                  {/* About Me Section */}
                  <section className="p-12 bg-white">
                <h2 className="text-center text-3xl font-bold mb-6">About Me</h2>
                <div className="flex flex-col md:flex-row items-center md:space-x-12">
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D03AQGhYPSmz_u4ZA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730441088583?e=1736985600&v=beta&t=FNV4GiOdfZhHMgU-d-xAwg3p1Ew3Ice3_anfPzWGSmQ"
                        alt="Rashid Khalique"
                        className="w-40 h-40 object-cover rounded-full shadow-lg"
                    />
                    <div className="mt-6 md:mt-0">
                        <p className="text-lg text-gray-700">
                            <strong>Biography:</strong><br />
                            Web & Wordpress Designer with 3+ years of experience, specializing in UI/UX Design, Dynamic Website, Wordpress Customization with projects across different industries.
                        </p>
                        <p className="text-lg text-gray-700 mt-4">
                            <strong>Location:</strong><br />
                            Based in Nawabshah , Sindh
                        </p>
                        <p className="text-lg text-gray-700 mt-4">
                            <strong>Contact:</strong><br />
                            <a href="mailto:email@example.com" className="text-blue-600 hover:text-blue-800">rashidkhanjamali26@gmail.com</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
                  {/* Services Section */}
                  <section id="services" className="bg-white py-16">
    <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900">My Services</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 lg:px-12">
        <div className="text-center bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="mb-4 text-blue-600">
            <i className="fas fa-palette text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-blue-600">UI/UX Design</h3>
            <p className="mt-4 text-gray-700">I’ll create a UI/UX design that will position your business as a leader in your industry.</p>
        </div>
        <div className="text-center bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="mb-4 text-blue-600">
            <i className="fas fa-laptop-code text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-blue-600">Dynamic Website</h3>
            <p className="mt-4 text-gray-700">I’ll build a dynamic website that allows you to easily update and manage content in real-time.</p>
        </div>
        <div className="text-center bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="mb-4 text-blue-600">
            <i className="fab fa-wordpress text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-blue-600">WordPress Design</h3>
            <p className="mt-4 text-gray-700">I’ll design your website in WordPress with an optimized UI/UX, helping your business stand out and thrive.</p>
        </div>
    </div>
</section>


            {/* Portfolio Section */}
            <section id="portfolio" className="py-16 bg-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-900">My Portfolio</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-6 lg:px-12">
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Project 1"
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition">
                            <p className="text-white text-lg">Project Title</p>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Project 2"
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition">
                            <p className="text-white text-lg">Project Title</p>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/400x300"
                            alt="Project 3"
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition">
                            <p className="text-white text-lg">Project Title</p>
                        </div>
                    </div>
                </div>
            </section>
{/* Contact Section */}
<section id="contact" className="py-16 bg-blue-50">
    <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900">Contact Me</h2>
    </div>
    <div className="flex justify-center w-70 ">
        <div className="w-full max-w-4xl shadow-lg p-8 bg-white rounded-lg">
            <div className="flex flex-col md:flex-row items-start justify-between p-8">
                <div className="w-full md:w-2/3 space-y-8 mt-12">
                    <div className="flex items-center space-x-3 text-lg text-gray-700">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <span>Nawabshah Sindh Pakistan</span>
                    </div>
                    <div className="flex items-center space-x-4 text-lg text-gray-700">
                        <FaEnvelope className="text-blue-600" />
                        <span><a href="mailto:email@example.com" className="text-blue-600 hover:underline">rashidkhanjamali26@gmail.com</a></span>
                    </div>
                    <div className="flex items-center space-x-4 text-lg text-gray-700">
                        <span className="text-blue-600">Follow Me:</span>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/rashid-web-developer/" target="_blank" className="text-blue-600 hover:text-blue-700">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/RashidKhalique" target="_blank" className="text-blue-600 hover:text-blue-700">
                                <FaGithub />
                            </a>
                            <a href="https://www.facebook.com/rashidali.jamali.712/" target="_blank" className="text-blue-600 hover:text-blue-700">
                                <FaFacebook />
                            </a>
                            <a href="https://www.instagram.com/rashid_ali_jamali/" target="_blank" className="text-blue-600 hover:text-blue-700">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/3 mt-8 md:mt-0">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700">Your Name</label>
                            <input type="text" id="name" name="name" className="w-full p-3 border rounded-lg" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Your Email</label>
                            <input type="email" id="email" name="email" className="w-full p-3 border rounded-lg" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700">Your Message</label>
                            <textarea id="message" name="message" rows="4" className="w-full p-3 border rounded-lg"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

                           









            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="text-center">
                    <p className="text-sm">© 2024 Rashid Khalique. All Rights Reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="https://www.linkedin.com/in/rashid-web-developer/"target="_blank" className="text-white hover:text-gray-400">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/RashidKhalique" target="_blank" className="text-white hover:text-gray-400">
                            <FaGithub />
                        </a>
                        <a href="https://www.facebook.com/rashidali.jamali.712/" target="_blank" className="text-white hover:text-gray-400">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/rashid_ali_jamali/" target="_blank" className="text-white hover:text-gray-400">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
