import { useState } from "react";
import { motion } from "framer-motion";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import NotFound from "@/pages/not-found";
import { Intro } from "./components/Intro";
import { Welcome } from "./components/Welcome";

const queryClient = new QueryClient();

// Resets on every page load (module re-evaluates), so intro always plays on reload
let introPlayed = false;

type Phase = "intro" | "welcome" | "done";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [phase, setPhase] = useState<Phase>(() => introPlayed ? "done" : "intro");
  const [siteAnimateIn, setSiteAnimateIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        {/* Site — mounts only when welcome starts exiting, so typing animation is fresh */}
        {siteAnimateIn && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </motion.div>
        )}

        {/* Intro terminal */}
        {phase === "intro" && (
          <Intro onDone={() => setPhase("welcome")} />
        )}

        {/* Welcome screen — sits on top while site renders behind it */}
        {phase === "welcome" && (
          <Welcome
            onExitStart={() => setSiteAnimateIn(true)}
            onDone={() => {
              introPlayed = true;
              setPhase("done");
            }}
          />
        )}

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
