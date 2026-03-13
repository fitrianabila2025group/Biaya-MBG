"use client";

import { FileText, BookOpen, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              MBG Cost Tracker
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              A transparent public estimation dashboard for Indonesia&rsquo;s
              Free Nutritious Meals program (Makan Bergizi Gratis).
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Methodology", href: "#methodology", icon: FileText },
                { label: "Source Registry", href: "#sources", icon: BookOpen },
                { label: "Program Scale", href: "#scale", icon: FileText },
                { label: "FAQ", href: "#faq", icon: FileText },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <link.icon className="h-3 w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Project
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/fitrianabila2025group/Biaya-MBG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="h-3 w-3" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="h-3 w-3" />
                  Submit a Correction
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Disclaimer
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              This dashboard estimates MBG spending using official budget and
              realization figures plus transparent formulas. It does not
              represent a live audited feed of treasury transactions.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Built as a public-interest data transparency project. If you have
            access to newer official sources, please contribute corrections.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Data last reviewed: 15 December 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
