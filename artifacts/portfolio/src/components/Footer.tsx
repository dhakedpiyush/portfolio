export function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-background relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Piyush Dhaked. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="hidden sm:inline">Built with</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <img
                src="/images/react-logo.png"
                alt="React"
                className="w-5 h-5 object-contain"
              />
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="flex items-center gap-1.5">
              <img
                src="/images/tailwind-logo.png"
                alt="Tailwind"
                className="w-5 h-5 object-contain"
              />
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="flex items-center gap-1.5">
              <img
                src="/images/sf-logo-footer.png"
                alt="Salesforce"
                className="w-5 h-5 object-contain"
              />
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="flex items-center gap-1.5">
              <img
                src="/images/brevo-logo.png"
                alt="Brevo"
                className="h-4 w-auto object-contain"
              />
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="flex items-center gap-1.5">
              <img
                src="/images/claude-logo.png"
                alt="Claude"
                className="w-5 h-5 object-contain"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
