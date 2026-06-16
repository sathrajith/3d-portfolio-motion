import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("https://formsubmit.co/ajax/isathrajith@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormState("success");
      form.reset();
      setTimeout(() => setFormState("idle"), 4000);
    } catch {
      setFormState("error");
      setErrorMsg("Failed to send. Please try again or email directly.");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl" />
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="name"
            placeholder="Your Name"
            required
            className="pl-11 h-12 bg-background/50 border-border/50 focus:border-cyan-500/50 transition-all duration-300 rounded-xl"
          />
        </div>
      </div>

      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl" />
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            className="pl-11 h-12 bg-background/50 border-border/50 focus:border-cyan-500/50 transition-all duration-300 rounded-xl"
          />
        </div>
      </div>

      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl" />
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
          <Textarea
            name="message"
            placeholder="Your message..."
            required
            rows={5}
            className="pl-11 bg-background/50 border-border/50 focus:border-cyan-500/50 transition-all duration-300 rounded-xl resize-none"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {formState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"
          >
            <CheckCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">Message sent successfully!</span>
          </motion.div>
        ) : formState === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">{errorMsg}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Button
        type="submit"
        disabled={formState === "sending" || formState === "success"}
        className="w-full h-12 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        {formState === "sending" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
