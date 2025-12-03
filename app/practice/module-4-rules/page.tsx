'use client'

import { useState } from 'react'

/**
 * MODULE 4: Project Rules (Teaching Copilot Your Style)
 *
 * This page helps you define, test, and refine your Copilot rules.
 * Copilot reads `.github/copilot-instructions.md` and follows your preferred coding patterns automatically.
 *
 * This module is RULES-FOCUSED and uses AGENT MODE tasks (bigger, goal-driven prompts).
 * No "suggestions" training here — you'll direct Copilot to scaffold real components/features that must follow your rules.
 */

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormErrors {
  email?: string
  password?: string
}

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        console.log('Login submitted:', formData)
        alert('Login successful!')
        setIsSubmitting(false)
      }, 1000)
    }
  }

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Login Form</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

interface NotificationBadgeProps {
  count: number
  maxCount?: number
}

const NotificationBadge = ({ count, maxCount = 99 }: NotificationBadgeProps) => {
  // Display count or "99+" if over maxCount
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString()
  
  // Don't render badge if count is 0
  if (count === 0) {
    return null
  }

  return (
    <span 
      className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[1.5rem]"
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  )
}

interface ProgressBarProps {
  value: number
  label?: string
}

const ProgressBar = ({ value, label }: ProgressBarProps) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100)
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{clampedValue}%</span>
        </div>
      )}
      <div 
        className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `Progress: ${clampedValue}%`}
      >
        <div 
          className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}

interface ModalDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
}

const ModalDialog = ({ open, onClose, title, children }: ModalDialogProps) => {
  if (!open) return null

  // Handle escape key to close modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title and close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close dialog"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>
  )
}

// Demo component to show modal in action
const ModalDialogDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        Open Modal
      </button>

      <ModalDialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p className="mb-4">
          This is a modal dialog component with accessible markup and a focus trap note.
        </p>
        <p className="text-sm text-gray-600">
          Note: In production, implement focus trapping to ensure keyboard navigation stays within the modal.
        </p>
      </ModalDialog>
    </div>
  )
}

export default function Module4Practice() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Module 4: Project Rules</h1>
          <p className="text-gray-600">Teach Copilot to follow your coding voice and style (Agent Mode)</p>
        </header>

        {/* LESSON 4.1 — Create Rules File */}
        <section className="bg-white p-6 rounded-lg shadow mb-10">
          <h2 className="text-2xl font-semibold mb-4">Lesson 4.1 — Setting Up Your Rules File</h2>
          <p className="text-gray-700 mb-4">
            Your project rules live in <code>.github/copilot-instructions.md</code>. Once created, Copilot automatically
            uses these instructions whenever you write or edit code in this repo.
          </p>

          <div className="bg-gray-50 p-4 rounded border text-sm text-gray-800 mb-4">
            <p className="font-semibold mb-2">Recommended rules:</p>
            <pre className="bg-white p-4 rounded border text-sm text-gray-800 overflow-x-auto">
{`# Copilot Instructions

- Use React functional components with arrow functions.
- Write TypeScript types or interfaces for component props and state.
- Style with Tailwind CSS; avoid inline styles.
- Keep components small, clean, and modular; extract helpers if a function grows large.
- Add concise comments for non-obvious logic.
- Prefer accessibility-first HTML (semantic elements; label interactive controls).
`}
            </pre>
          </div>

          <p className="text-gray-700">
            Save your rules file, then move on to the next section to validate that Copilot follows them in Agent Mode.
          </p>
        </section>

        {/* LESSON 4.2 — Test Rules with Agent Mode */}
        <section className="bg-white p-6 rounded-lg shadow mb-10 border-l-4 border-blue-400">
          <h2 className="text-2xl font-semibold mb-4">Lesson 4.2 — Testing Your Rules (Agent Mode)</h2>
          <p className="text-gray-700 mb-4">
            Use the practice area below to **direct Copilot (Agent Mode)** to scaffold real features. Each task should
            naturally follow your rules: arrow functions, TypeScript types, Tailwind classes, and minimal, purposeful comments.
          </p>

          <div className="border-2 border-blue-400 rounded p-4 bg-blue-50">
            <h3 className="font-semibold mb-2 text-gray-800">Practice Area — Agent Tasks</h3>
            <p className="text-sm text-gray-600 mb-4">Add a comment below and run the task with Copilot (Agent Mode):</p>

            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-1">
              <li>
                <code>{'// Scaffold a LoginForm with email, password, and submit button. Client-side validation, Tailwind styling, accessible labels.'}</code>
              </li>
              <li>
                <code>{'// Build a ProfileCard with avatar image, name, bio, and a "Contact" button. Keep layout responsive and concise.'}</code>
              </li>
              <li>
                <code>{'// Create a PrimaryButton component (props: children, onClick, type?). Apply our standard Tailwind button style.'}</code>
              </li>
              <li>
                <code>{'// Implement a simple SearchBar with input, clear button, and debounced onChange callback (300ms).'}</code>
              </li>
            </ul>

            <p className="text-sm text-gray-600 mb-2">Expected (based on your rules):</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Arrow-function components</li>
              <li>TypeScript props/interfaces</li>
              <li>Tailwind classes (no inline styles)</li>
              <li>Small, focused structure + brief comments for non-obvious logic</li>
              <li>Accessible markup for inputs and controls</li>
            </ul>

            {/* Practice area for Copilot (Agent Mode) generation */}
            
            <LoginForm />
          </div>
        </section>

        {/* LESSON 4.3 — Consistency Across Multiple Components */}
        <section className="bg-white p-6 rounded-lg shadow mb-10 border-l-4 border-green-400">
          <h2 className="text-2xl font-semibold mb-4">Lesson 4.3 — Consistency Across Components</h2>
          <p className="text-gray-700 mb-4">
            Generate multiple components and verify that Copilot keeps your rules consistent across different feature shapes.
          </p>

          <div className="border-2 border-green-400 rounded p-4 bg-green-50">
            <p className="text-sm text-gray-700 mb-4">Agent tasks to try one-by-one:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-1">
              <li>
                <code>{'// Create a NotificationBadge (props: count, maxCount?) that displays "99+" when over max.'}</code>
              </li>
              <li>
                <code>{'// Create a ProgressBar (props: value 0–100, label?). Include accessible markup for screen readers.'}</code>
              </li>
              <li>
                <code>{'// Create a ModalDialog (props: open, onClose, title). Include a close button and focus trap note in comments.'}</code>
              </li>
              <li>
                <code>{'// Create a DataTable shell (columns prop, rows prop). Responsive table layout with Tailwind utilities.'}</code>
              </li>
            </ul>

            <p className="text-sm text-gray-700">
              After each generation, check for rule adherence (arrow functions, typed props, Tailwind rhythm, minimal comments). If anything drifts,
              adjust <code>.github/copilot-instructions.md</code> and retry the task.
            </p>

            <div className="mt-6 flex gap-4 flex-wrap">
              <NotificationBadge count={5} />
              <NotificationBadge count={42} maxCount={99} />
              <NotificationBadge count={150} maxCount={99} />
              <NotificationBadge count={0} />
            </div>

            <div className="mt-8 space-y-4 max-w-md">
              <ProgressBar value={25} label="Loading..." />
              <ProgressBar value={60} label="Upload Progress" />
              <ProgressBar value={100} label="Complete" />
              <ProgressBar value={45} />
            </div>

            <ModalDialogDemo />
          </div>
        </section>

        {/* LESSON 4.4 — Refining and Expanding Rules */}
        <section className="bg-white p-6 rounded-lg shadow mb-10 border-l-4 border-purple-400">
          <h2 className="text-2xl font-semibold mb-4">Lesson 4.4 — Refining and Expanding Rules</h2>
          <p className="text-gray-700 mb-4">
            As your project grows, evolve your rules with specific, reusable patterns so Agent Mode drafts match your voice without reminders.
          </p>

          <p className="text-gray-700 mb-4">Examples you can add to your rules file:</p>
          <pre className="bg-gray-50 p-4 rounded border text-sm text-gray-800 overflow-x-auto mb-4">
{`- Primary button style: 'px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60'.
- Form inputs: use label + id + aria-describedby; include error text with role="alert".
- Components over ~25 lines: extract helpers; keep render paths simple and readable.
- Prefer composition over prop drilling; create small utilities/hooks for repeated logic.
`}
          </pre>

          <p className="text-gray-700">
            Keep the file updated as your standards change. Copilot will follow the latest version across all Agent Mode tasks.
          </p>
        </section>

        {/* SUMMARY */}
        <section className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Takeaways</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Define once, follow everywhere.</strong> Copilot reads your rules automatically.</li>
            <li><strong>Direct with Agent Mode.</strong> Use bigger tasks to see your rules applied in realistic code.</li>
            <li><strong>Refine as you go.</strong> When you see drift, clarify the rule and retry.</li>
            <li><strong>Keep it modular.</strong> Small components + typed props + Tailwind rhythm = consistent output.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
