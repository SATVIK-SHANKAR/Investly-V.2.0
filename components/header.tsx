"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X, TrendingUp, LayoutDashboard, LineChart, Briefcase, Newspaper, User, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white">Investly</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <nav className="flex items-center mr-4">
            <Link
              href="/dashboard"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/dashboard")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 inline-block mr-1" />
              Dashboard
            </Link>
            <Link
              href="/portfolio"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/portfolio")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
            >
              <Briefcase className="h-4 w-4 inline-block mr-1" />
              Portfolio
            </Link>
            <Link
              href="/markets"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/markets")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
            >
              <LineChart className="h-4 w-4 inline-block mr-1" />
              Markets
            </Link>
            <Link
              href="/news"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive("/news")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
            >
              <Newspaper className="h-4 w-4 inline-block mr-1" />
              News
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    JD
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portfolio" className="cursor-pointer">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Portfolio</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </div>

        <div className="flex md:hidden items-center space-x-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-slide-down">
          <nav className="flex flex-col p-4">
            <Link
              href="/dashboard"
              className={`px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                isActive("/dashboard")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4 inline-block mr-2" />
              Dashboard
            </Link>
            <Link
              href="/portfolio"
              className={`px-3 py-3 mt-1 text-sm font-medium rounded-md transition-colors ${
                isActive("/portfolio")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="h-4 w-4 inline-block mr-2" />
              Portfolio
            </Link>
            <Link
              href="/markets"
              className={`px-3 py-3 mt-1 text-sm font-medium rounded-md transition-colors ${
                isActive("/markets")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LineChart className="h-4 w-4 inline-block mr-2" />
              Markets
            </Link>
            <Link
              href="/news"
              className={`px-3 py-3 mt-1 text-sm font-medium rounded-md transition-colors ${
                isActive("/news")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Newspaper className="h-4 w-4 inline-block mr-2" />
              News
            </Link>
            <Link
              href="/account"
              className={`px-3 py-3 mt-1 text-sm font-medium rounded-md transition-colors ${
                isActive("/account")
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  : "text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-4 w-4 inline-block mr-2" />
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
