import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logoutMutation, isCompany } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-primary text-2xl font-bold cursor-pointer">JobJet</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/">
                <span className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${
                  location === "/" 
                    ? "border-primary text-foreground" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}>
                  Find Jobs
                </span>
              </Link>
              <Link href="/companies">
                <span className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${
                  location === "/companies" 
                    ? "border-primary text-foreground" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}>
                  Companies
                </span>
              </Link>
              <Link href="/resources">
                <span className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${
                  location === "/resources" 
                    ? "border-primary text-foreground" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}>
                  Resources
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {user ? (
              <>
                {isCompany && (
                  <Link href="/post-job">
                    <Button className="bg-primary hover:bg-primary/90">Post a Job</Button>
                  </Link>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {isCompany && (
                      <DropdownMenuItem>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Link href="/applications">Applications</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="py-4 space-y-4">
                  <Link href="/" onClick={closeMobileMenu}>
                    <span className={`block py-2 px-4 text-base font-medium rounded-md cursor-pointer ${
                      location === "/" 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}>
                      Find Jobs
                    </span>
                  </Link>
                  <Link href="/companies" onClick={closeMobileMenu}>
                    <span className={`block py-2 px-4 text-base font-medium rounded-md cursor-pointer ${
                      location === "/companies" 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}>
                      Companies
                    </span>
                  </Link>
                  <Link href="/resources" onClick={closeMobileMenu}>
                    <span className={`block py-2 px-4 text-base font-medium rounded-md cursor-pointer ${
                      location === "/resources" 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}>
                      Resources
                    </span>
                  </Link>
                  
                  {user ? (
                    <>
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center px-4">
                          <div className="flex-shrink-0">
                            <Avatar>
                              <AvatarImage src="" alt={user.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <Link href="/profile" onClick={closeMobileMenu}>
                            <span className="block py-2 px-4 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
                              Profile
                            </span>
                          </Link>
                          {isCompany && (
                            <Link href="/dashboard" onClick={closeMobileMenu}>
                              <span className="block py-2 px-4 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
                                Dashboard
                              </span>
                            </Link>
                          )}
                          {isCompany && (
                            <Link href="/post-job" onClick={closeMobileMenu}>
                              <span className="block py-2 px-4 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
                                Post a Job
                              </span>
                            </Link>
                          )}
                          <Link href="/applications" onClick={closeMobileMenu}>
                            <span className="block py-2 px-4 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
                              Applications
                            </span>
                          </Link>
                          <a 
                            className="block py-2 px-4 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
                            onClick={() => {
                              handleLogout();
                              closeMobileMenu();
                            }}
                          >
                            Sign out
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="border-t border-border pt-4 px-4 flex flex-col space-y-3">
                      <Link href="/auth" onClick={closeMobileMenu}>
                        <Button className="w-full justify-center" variant="outline">Sign In</Button>
                      </Link>
                      <Link href="/auth" onClick={closeMobileMenu}>
                        <Button className="w-full justify-center">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
