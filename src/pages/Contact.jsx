import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

// ─────────────────────────────────────────────────────────
// 👇 REPLACE THESE WITH YOUR REAL EMAILJS CREDENTIALS
// Get them from: https://www.emailjs.com/
// ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => {
        setStatus('success')
        formRef.current.reset()
      })
      .catch(() => {
        setStatus('error')
      })
  }

  return (
    <section className="py-20 px-8 min-h-screen bg-white dark:bg-black text-center">
      <h2 className="tracking-[0.15em] mb-12 text-black dark:text-[#f5f5f5]">CONTACT</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-[600px] mx-auto text-left">

        {/* Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm tracking-[0.05em] dark:text-[#ccc]">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#444] font-serif text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm tracking-[0.05em] dark:text-[#ccc]">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#444] font-serif text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm tracking-[0.05em] dark:text-[#ccc]">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#444] font-serif text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-y"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-block mt-2 px-6 py-2 bg-[rgb(4,122,59)] hover:bg-[rgb(3,100,48)] disabled:opacity-60 text-white font-serif tracking-wider transition-colors duration-200"
        >
          {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
        </button>

        {/* Feedback messages */}
        {status === 'success' && (
          <p className="mt-4 text-green-600 dark:text-green-400 text-sm tracking-wide">
            ✓ Message sent! I'll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-500 text-sm tracking-wide">
            ✗ Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>

      {/* Setup hint */}
      <div className="mt-12 max-w-[600px] mx-auto text-left text-sm text-[#888] dark:text-[#555] border border-gray-200 dark:border-[#222] p-4">
        <p className="font-medium mb-2 text-black dark:text-[#aaa]">⚙️ EmailJS Setup (one-time)</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a> and create a free account</li>
          <li>Add an Email Service (Gmail, Outlook, etc.)</li>
          <li>Create an Email Template — use variables: <code>{'{{name}}'}</code>, <code>{'{{email}}'}</code>, <code>{'{{message}}'}</code></li>
          <li>Copy your <strong>Service ID</strong>, <strong>Template ID</strong>, and <strong>Public Key</strong></li>
          <li>Replace the placeholder values at the top of <code>Contact.jsx</code></li>
        </ol>
      </div>
    </section>
  )
}
