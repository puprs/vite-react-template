import React, { ReactNode } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./navbar";

interface ParentDivProps {
    children: ReactNode;
  }

const PageLayout: React.FC<ParentDivProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <header className="bg-background text-foreground p-2 border-b border-muted">
        <Navbar />
      </header>

      <main className="flex-grow">
        {children}
        <Toaster />
      </main>
    </div>
  );
};

export default PageLayout