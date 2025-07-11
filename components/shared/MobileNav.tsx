"use client"
import {SignedIn , SignedOut,  UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle 
} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { OptimizedLink } from "../OptimizedLink"

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <header className="header">
        <OptimizedLink href="/" className="flex items-center gap-2 md:py-2">
            <Image
            src="/assets/images/logo-text.svg"
            alt="Logo"
            width={180}
            height={28}
            />
        </OptimizedLink>
        <nav className="flex gap-2">
            <SignedIn>
                <UserButton afterSwitchSessionUrl="/"/>
                    <Sheet>
                        <SheetTrigger>
                            <Image 
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            width={32}
                            height={32}
                            className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className="sheet-content sm:w-64">
                            <SheetTitle >
                                <Image
                                    src="/assets/images/logo-text.svg"
                                    alt="Logo"
                                    width={152}
                                    height={23}
                                /></SheetTitle> 
                            <>
                                
                                <ul className="header-nav_elements">
                                    {
                                        navLinks.map((link) => {
                                            const isActive = link.route === pathname
                                        
                                            return (
                                                <li key={link.route} 
                                                className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                                                >
                                                    <OptimizedLink href={link.route} className='sidebar-link cursor-pointer'>
                                                    <Image
                                                        src={link.icon}
                                                        alt={link.label}
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {link.label}
                                                    </OptimizedLink>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
            </SignedIn>
            <SignedOut>
                <Button asChild className='button bg-purple-gradient bg-cover'>
                    <OptimizedLink href='/sign-in'>Login</OptimizedLink>
                </Button>
            </SignedOut>
        </nav>
        
    </header>
  )
}

export default MobileNav
