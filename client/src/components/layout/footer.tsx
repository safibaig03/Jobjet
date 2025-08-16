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
                <Link href="/">
                  <a className="text-base text-slate-300 hover:text-white">Browse Jobs</a>
                </Link>
              </li>
              <li>
                <Link href="/auth">
                  <a className="text-base text-slate-300 hover:text-white">Create Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-base text-slate-300 hover:text-white">Job Alerts</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="text-base text-slate-300 hover:text-white">Career Resources</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">For Employers</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/post-job">
                  <a className="text-base text-slate-300 hover:text-white">Post a Job</a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="text-base text-slate-300 hover:text-white">Pricing</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="text-base text-slate-300 hover:text-white">Recruiting Solutions</a>
                </Link>
              </li>
              <li>
                <Link href="/companies">
                  <a className="text-base text-slate-300 hover:text-white">Company Profiles</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about">
                  <a className="text-base text-slate-300 hover:text-white">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-base text-slate-300 hover:text-white">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <a className="text-base text-slate-300 hover:text-white">Press</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-base text-slate-300 hover:text-white">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy">
                  <a className="text-base text-slate-300 hover:text-white">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-base text-slate-300 hover:text-white">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a className="text-base text-slate-300 hover:text-white">Cookie Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/accessibility">
                  <a className="text-base text-slate-300 hover:text-white">Accessibility</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-300">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-300">
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
