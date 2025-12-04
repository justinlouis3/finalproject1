'use client'

import { useState, useEffect } from 'react'

/**
 * MODULE 5: Final Project - Portfolio Website
 *
 * This is your capstone project! You'll build a complete personal portfolio
 * website using everything you've learned:
 * - Agent Mode for scaffolding large sections
 * - Edit Mode for surgical refinements
 * - Ask Mode for guidance and improvements
 * - Your rules for consistent styling
 *
 * Follow the step-by-step instructions marked below.
 */

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: ''
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
      isValid = false
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setIsSubmitted(false)
      }, 3000)
    }
  }

  const isFormValid = formData.name.trim() && formData.email.trim() && validateEmail(formData.email) && formData.message.trim().length >= 10

  return (
    <div className="max-w-2xl mx-auto">
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 rounded-lg">
          <p className="font-semibold">✓ Message sent successfully!</p>
          <p className="text-sm">Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors resize-none`}
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isFormValid ? 'Send Message' : 'Please fill all fields correctly'}
        </button>
      </form>
    </div>
  )
}

export default function Module5Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Portfolio</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex gap-8">
                <li>
                  <a href="#hero" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <ul className="flex flex-col gap-4">
                <li>
                  <a 
                    href="#hero" 
                    onClick={closeMobileMenu}
                    className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#projects" 
                    onClick={closeMobileMenu}
                    className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    onClick={closeMobileMenu}
                    className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={closeMobileMenu}
                    className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 xl:py-40">
        <div className={`text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-4 sm:mb-6">
            <span className="text-base sm:text-lg md:text-xl text-blue-600 dark:text-blue-400 font-semibold">Welcome to my portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Justin</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 max-w-4xl mx-auto px-4">
            Frontend Developer crafting elegant solutions to complex problems
          </p>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            I specialize in building modern web applications with React, Next.js, and TypeScript.
            Passionate about creating exceptional user experiences and writing clean, maintainable code.
          </p>
          <a 
            href="mailto:your.email@example.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl">Here are some of my recent works</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* Project Card 1 - E-Commerce Platform */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop" 
                alt="E-Commerce Platform"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-semibold rounded-full">React</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs font-semibold rounded-full">Node.js</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">E-Commerce Platform</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A full-featured online shopping platform with cart functionality, payment integration, and admin dashboard.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-1">
                  View Code →
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold flex items-center gap-1">
                  Live Demo →
                </a>
              </div>
            </div>
          </div>

          {/* Project Card 2 - Task Management App */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" 
                alt="Task Management App"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs font-semibold rounded-full">Next.js</span>
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 text-xs font-semibold rounded-full">TypeScript</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Task Management App</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Collaborative task manager with real-time updates, drag-and-drop interface, and team collaboration features.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-1">
                  View Code →
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold flex items-center gap-1">
                  Live Demo →
                </a>
              </div>
            </div>
          </div>

          {/* Project Card 3 - Weather Dashboard */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative h-56 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop" 
                alt="Weather Dashboard"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 text-xs font-semibold rounded-full">React</span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 text-xs font-semibold rounded-full">API</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Weather Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Beautiful weather app with 7-day forecasts, location search, and interactive weather maps using live API data.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-1">
                  View Code →
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold flex items-center gap-1">
                  Live Demo →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">About Me</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl">Get to know me better</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Photo */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-blue-600 dark:border-blue-400">
              <img 
                src="/profile.jpeg" 
                alt="Justin - Frontend Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Hello, I'm Justin</h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              I'm a passionate Frontend Developer specializing in building modern, responsive web 
              applications. I love transforming ideas into beautiful, functional digital experiences 
              that users enjoy and businesses value.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              My journey in web development started with an intense curiosity about how websites work, 
              which led me to dive deep into modern frameworks and best practices. Through dedicated 
              learning and hands-on projects, I've developed a strong foundation in creating intuitive 
              user interfaces and solving complex problems with clean, maintainable code.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you can find me staying current with the latest web technologies, 
              working on personal projects to expand my skill set, and connecting with the developer 
              community to share insights and learn from others.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-12 sm:mt-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">Skills & Technologies</h3>
            
            {/* Frontend Skills */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">Frontend Development</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">React</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Next.js</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">TypeScript</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">JavaScript</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">HTML5</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">CSS3</span>
                </div>
              </div>
            </div>

            {/* Styling & Tools */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">Styling & UI</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Sass/SCSS</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Material-UI</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Responsive Design</span>
                </div>
              </div>
            </div>

            {/* Tools & Others */}
            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">Tools & Others</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Git & GitHub</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">VS Code</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">REST APIs</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">Figma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 xl:py-40 bg-white dark:bg-gray-900">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl px-4">Have a project in mind? Let's work together!</p>
        </div>

        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Justin</h3>
              <p className="text-gray-400">
                Frontend Developer crafting beautiful and functional web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
              <div className="flex flex-col space-y-3">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter Profile"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>© 2025 Justin. All rights reserved.</p>
              <p className="mt-2 md:mt-0">
                Built with <span className="text-red-500">❤</span> using Next.js & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================
       * 🎯 STEP 2: FILL IN THE HERO SECTION
       * ==========================================
       *
       * ✅ TODO: ADD CONTENT TO HERO SECTION
       *
       * Once you have the base layout, enhance the hero:
       *
       * Instructions:
       * 1. Highlight the hero section in your new layout
       * 2. Use Inline Chat (Ctrl/Cmd + I)
       * 3. Ask: "Hero with my name, tagline, and a 'Contact Me' button"
       * 4. Customize with your actual name and tagline
       * 5. Refine: "Make the button a mailto: link to [your-email]"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 3: BUILD THE PROJECTS GRID
       * ==========================================
       *
       * ✅ TODO: ADD PROJECT CARDS
       *
       * Instructions:
       * 1. Highlight the projects section
       * 2. Use Agent Mode
       * 3. Ask: "Projects section with cards: title, description,
       *         image placeholder, and link"
       * 4. Add 3-4 sample projects
       * 5. Refine with Inline Chat: "Add a hover animation for each card"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 4: CREATE THE FOOTER
       * ==========================================
       *
       * ✅ TODO: ADD FOOTER WITH SOCIAL LINKS
       *
       * Instructions:
       * 1. Highlight the footer section
       * 2. Use Inline Chat
       * 3. Ask: "Footer with copyright and links to GitHub,
       *         LinkedIn, Twitter"
       * 4. Refine: "Add aria-labels for social links"
       * 5. Update with your actual social media URLs
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 5: ADD AN ABOUT SECTION
       * ==========================================
       *
       * ✅ TODO: INSERT ABOUT SECTION
       *
       * Instructions:
       * 1. Place cursor between Projects and Footer
       * 2. Use Agent Mode
       * 3. Ask: "About section with my photo placeholder,
       *         short bio, and list of skills"
       * 4. Refine: "Use Tailwind spacing consistent with Hero section"
       * 5. Refine: "Keep the About text in a centered column"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 6: ADD CONTACT FORM
       * ==========================================
       *
       * ✅ TODO: CREATE CONTACT FORM
       *
       * Instructions:
       * 1. Add a new section before the footer
       * 2. Use Agent Mode
       * 3. Ask: "Add a contact form with name, email,
       *         message and basic validation"
       * 4. Use Edit Mode: "Disable submit until all fields are valid"
       * 5. Add: "Show success message after submission"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 7: ADD DARK MODE (OPTIONAL)
       * ==========================================
       *
       * ✅ TODO: IMPLEMENT DARK MODE TOGGLE
       *
       * Instructions:
       * 1. Highlight the header
       * 2. Use Agent Mode
       * 3. Ask: "Add dark mode toggle in the header"
       * 4. Test the toggle works across all sections
       * 5. Refine colors if needed
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 STEP 8: POLISH & ANIMATIONS
       * ==========================================
       *
       * ✅ TODO: ADD FINISHING TOUCHES
       *
       * Use Edit Mode for these refinements:
       * 1. "Fade in hero section on page load"
       * 2. "Add smooth scroll behavior for navigation links"
       * 3. "Improve spacing and typography hierarchy"
       * 4. "Ensure all sections are responsive on mobile"
       * 5. "Add loading states where appropriate"
       *
       * ========================================== */}

      {/* ==========================================
       * 🎯 FINAL REVIEW CHECKLIST
       * ==========================================
       *
       * Before you're done, verify:
       *
       * ✓ Responsive Design
       *   - Test on mobile, tablet, desktop viewports
       *   - Check text is readable at all sizes
       *
       * ✓ Accessibility
       *   - All interactive elements have aria-labels
       *   - Images have alt text
       *   - Keyboard navigation works
       *   - Color contrast is sufficient
       *
       * ✓ Consistency
       *   - Follows your .github/copilot-instructions.md rules
       *   - Uses Tailwind classes consistently
       *   - Arrow functions throughout
       *   - TypeScript types defined
       *
       * ✓ Functionality
       *   - All links work
       *   - Contact form validates input
       *   - Animations are smooth
       *   - No console errors
       *
       * ========================================== */}
    </div>
  )
}

/* ==========================================
 * 💡 TIPS FOR SUCCESS
 * ==========================================
 *
 * 1. START BIG, THEN REFINE
 *    - Use Agent Mode to scaffold entire sections quickly
 *    - Then use Edit Mode (Inline Chat) for small improvements
 *    - Don't try to get everything perfect in one prompt
 *
 * 2. ITERATE IN STEPS
 *    - Build one section at a time
 *    - Test each section before moving to the next
 *    - It's easier to debug small changes
 *
 * 3. USE ASK MODE FOR GUIDANCE
 *    - "What's the best way to structure this component?"
 *    - "How can I improve the performance here?"
 *    - "What accessibility features am I missing?"
 *
 * 4. CUSTOMIZE IT
 *    - Replace placeholder text with your real information
 *    - Add your own projects and achievements
 *    - Make it reflect your personality and style
 *
 * 5. LEARN BY REVIEWING
 *    - Don't just accept code blindly
 *    - Read what Copilot generates
 *    - Ask it to explain anything unclear
 *    - Understand the patterns so you can use them later
 *
 * 6. COMMON ISSUES & FIXES
 *    - Spacing looks off? → "Improve spacing using Tailwind"
 *    - Not responsive? → "Make this section responsive on mobile"
 *    - Missing types? → "Add TypeScript types for props"
 *    - Need animation? → "Add smooth transition animations"
 *
 * ========================================== */

/* ==========================================
 * 🎉 CONGRATULATIONS!
 * ==========================================
 *
 * When you complete this portfolio, you will have:
 *
 * ✓ Built a real, production-ready website with Copilot
 * ✓ Mastered Agent Mode for large scaffolding tasks
 * ✓ Used Edit Mode for precise refinements
 * ✓ Applied Ask Mode for strategic guidance
 * ✓ Leveraged rules for consistent code style
 * ✓ Created something you can actually deploy and share!
 *
 * NEXT STEPS:
 * - Deploy your portfolio to Vercel or Netlify
 * - Share it on LinkedIn and Twitter
 * - Keep practicing with Copilot on real projects
 * - Teach others what you've learned
 *
 * Remember: Copilot is a tool to amplify your skills,
 * not replace them. The more you understand code, the
 * better you'll be at directing Copilot to build
 * exactly what you envision.
 *
 * Happy coding! 🚀
 *
 * ========================================== */
