import React, { ReactNode } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./navbar";
import { ScrollArea } from "./ui/scroll-area";

interface ParentDivProps {
    children: ReactNode;
  }

const PageLayout: React.FC<ParentDivProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <header className="bg-background text-foreground p-2 border-b border-muted">
        <Navbar />
      </header>

      <main className="flex-grow overflow-auto">
        <ScrollArea className="h-[calc(100vh-36px)]">{children}</ScrollArea>
        <Toaster />
      </main>
    </div>
  );
};

export default PageLayout