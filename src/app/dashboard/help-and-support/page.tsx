
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'How do I trigger the panic button?',
    answer:
      'You can trigger the panic button from the main dashboard by clicking the "Panic" button. A confirmation dialog will appear to prevent accidental activation. Once confirmed, emergency services will be notified.',
  },
  {
    question: 'How do I manage my security team?',
    answer:
      'Navigate to the "Communications" tab. From there, you can view team status, send messages, and manage your security teams.',
  },
  {
    question: 'What is the Predictive Risk Assessment feature?',
    answer:
      'The Predictive Risk Assessment tool on your dashboard uses AI to analyze potential threats for upcoming events based on the data you provide. It gives you a risk score and security recommendations.',
  },
  {
    question: 'How can I update my profile and notification settings?',
    answer:
      'You can update your personal information, password, and notification preferences on the "Settings" page, accessible from the user menu in the top-right corner.',
  },
];

export default function HelpAndSupportPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: "Message Sent",
            description: "Thank you for contacting us. Our support team will get back to you shortly.",
        });
        (e.target as HTMLFormElement).reset();
    }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Help & Support</CardTitle>
          <CardDescription>
            Find answers to common questions or contact our support team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Trouble with event setup" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue in detail..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
