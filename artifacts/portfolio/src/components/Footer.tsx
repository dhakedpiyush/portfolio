export function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-background relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Piyush Dhaked. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>Built with React & Tailwind</span>
          <span className="w-1 h-1 rounded-full bg-primary"></span>
          <a href="#home" className="hover:text-primary transition-colors">Back to Top</a>
        </div>
      </div>
    </footer>
  );
}
