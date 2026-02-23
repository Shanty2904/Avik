export default function Footer() {
  return (
    <footer className="py-8 text-center bg-white dark:bg-black text-[#666] dark:text-[#888] text-sm transition-colors duration-300">
      <div className="flex justify-center gap-6 mb-4">
        <a
          href="https://www.instagram.com/YOURUSERNAME"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="social-instagram"
        >
          <img src="/Assets/instagram.png" alt="Instagram" className="w-7 h-auto transition-transform duration-200 hover:scale-110" />
        </a>

        <a
          href="https://www.linkedin.com/in/YOURUSERNAME"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="social-linkedin"
        >
          <img src="/Assets/linkedin.png" alt="LinkedIn" className="w-7 h-auto transition-transform duration-200 hover:scale-110" />
        </a>
      </div>

      <p>© 2026 Avik. All rights reserved.</p>
    </footer>
  )
}
