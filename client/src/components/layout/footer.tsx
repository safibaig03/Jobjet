import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">For Job Seekers</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/jobs" className="text-base text-slate-300 hover:text-white">Browse Jobs</Link>
              </li>
              <li>
                <Link href="/auth" className="text-base text-slate-300 hover:text-white">Create Profile</Link>
              </li>
              <li>
                <Link href="/job-alerts" className="text-base text-slate-300 hover:text-white">Job Alerts</Link>
              </li>
              <li>
                <Link href="/resources" className="text-base text-slate-300 hover:text-white">Career Resources</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">For Employers</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/post-job" className="text-base text-slate-300 hover:text-white">Post a Job</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-base text-slate-300 hover:text-white">Pricing</Link>
              </li>
              <li>
                <Link href="/recruiting-solutions" className="text-base text-slate-300 hover:text-white">Recruiting Solutions</Link>
              </li>
              <li>
                <Link href="/companies" className="text-base text-slate-300 hover:text-white">Company Profiles</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-slate-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="text-base text-slate-300 hover:text-white">Blog</Link>
              </li>
              <li>
                <Link href="/press" className="text-base text-slate-300 hover:text-white">Press</Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-slate-300 hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-base text-slate-300 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-slate-300 hover:text-white">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-base text-slate-300 hover:text-white">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-base text-slate-300 hover:text-white">Accessibility</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-slate-400">
              &copy; {new Date().getFullYear()} JobJet, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
