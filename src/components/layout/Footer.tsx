import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#081b4c] text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/ExShip logo-01.png" 
                alt="ExShip Logo" 
                className="h-10 w-auto object-contain" 
              />
            </Link>
            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              ExShip is your trusted global logistics and courier aggregation platform. We connect businesses and individuals with top-tier courier networks worldwide for fast, reliable, and cost-effective shipping.
            </p>
            <div className="flex items-center gap-4 pt-2 text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-200 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                ISO 27001 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-200 font-medium">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                250+ Countries Covered
              </span>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/quote" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Instant Quote
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Track Shipment
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard/ship-manager" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Ship Manager
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard/manage/csv-mapping" className="hover:text-blue-400 transition-colors flex items-center gap-1 group">
                  Bulk CSV Import
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Company */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link href="#about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#couriers" className="hover:text-blue-400 transition-colors">Carrier Partners</Link></li>
              <li><Link href="#pricing" className="hover:text-blue-400 transition-colors">Pricing & Rates</Link></li>
              <li><Link href="/support" className="hover:text-blue-400 transition-colors">Support & Help Center</Link></li>
            </ul>
          </div>

          {/* Quick Links: Legal & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Contact & Legal</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@exship.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+1 (800) 555-EXSHIP</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Global Logistics Hub</span>
              </li>
              <li className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ExShip Logistics Inc. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ExShip logo-01.png" alt="ExShip" className="h-4 w-auto object-contain" />
          </p>
        </div>

      </div>
    </footer>
  );
}
