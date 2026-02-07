
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Bell, FileQuestion, HandCoins, Check, X, Share2, PlusCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";

const notifications = [
    {
        type: 'share',
        title: 'Credential Shared',
        description: 'Alice shared a "Conference Pass" with you.',
        time: '20m ago'
    },
    {
        type: 'issue',
        title: 'Credential Issued',
        description: 'State University issued your "Master\'s Degree".',
        time: '45m ago'
    },
    {
        type: 'payment',
        title: 'Payment Request',
        description: 'Jane Doe is requesting a payment of $25.00 for "Lunch".',
        time: '1h ago'
    }
];


export default function NotificationMenu() {
    const { toast } = useToast();

    const handleProvide = () => {
        toast({
            title: "Credential Provided",
            description: "Your Proof of KYC has been sent to Crypto Exchange Inc."
        })
    }

    const handlePay = () => {
        toast({
            title: "Payment Sent",
            description: "You have sent $25.00 to Jane Doe."
        })
    }

    const handleAccept = () => {
        toast({
            title: "Credential Accepted",
            description: "Your Master's Degree has been added to your wallet."
        })
    }

    const handleView = () => {
        toast({
            title: "Viewing Credential",
            description: "Opening the shared Conference Pass."
        })
    }
    
    const handleDecline = () => {
        toast({
            title: "Action Recorded",
            description: "The request has been dismissed.",
            variant: "destructive"
        })
    }

    const getIcon = (type: string) => {
        switch(type) {
            case 'credential': return <FileQuestion className="h-5 w-5 text-primary" />;
            case 'share': return <Share2 className="h-5 w-5 text-primary" />;
            case 'issue': return <PlusCircle className="h-5 w-5 text-primary" />;
            case 'payment': return <HandCoins className="h-5 w-5 text-primary" />;
            default: return <Bell className="h-5 w-5 text-primary" />;
        }
    }

    const getActionLabel = (type: string) => {
        switch(type) {
            case 'credential': return 'Provide';
            case 'share': return 'View';
            case 'issue': return 'Accept';
            case 'payment': return 'Pay';
            default: return 'Action';
        }
    }

    const getSecondaryActionLabel = (type: string) => {
        switch(type) {
            case 'credential': return 'Reject';
            case 'share': return 'Ignore';
            case 'issue': return 'Reject';
            case 'payment': return 'Decline';
            default: return 'Dismiss';
        }
    }

    const getActionHandler = (type: string) => {
        switch(type) {
            case 'credential': return handleProvide;
            case 'share': return handleView;
            case 'issue': return handleAccept;
            case 'payment': return handlePay;
            default: return () => {};
        }
    }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Notifications" 
          className="relative h-10 w-10 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors text-primary"
        >
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge 
              variant="accent" 
              className="absolute -top-0.5 -right-0.5 h-4.5 min-w-[18px] justify-center px-1 py-0 text-[10px] font-bold border-2 border-background shadow-sm"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-xl p-2 shadow-xl border-primary/10">
        <DropdownMenuLabel className="px-3 py-2 text-base font-headline">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-2" />
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index}>
              <DropdownMenuItem className="flex !items-start gap-4 p-3 rounded-lg cursor-default focus:bg-primary/5 outline-none transition-colors">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between items-start">
                        <p className="font-semibold text-sm leading-tight">{notification.title}</p>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-normal">{notification.description}</p>
                    <div className="flex gap-2 pt-1">
                        <Button 
                          size="sm" 
                          className="h-8 px-3 rounded-full text-xs font-semibold" 
                          onClick={getActionHandler(notification.type)}
                        >
                            <Check className="mr-1 h-3 w-3" />
                            {getActionLabel(notification.type)}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 px-3 rounded-full text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5" 
                          onClick={handleDecline}
                        >
                          <X className="mr-1 h-3 w-3" />
                          {getSecondaryActionLabel(notification.type)}
                        </Button>
                    </div>
                </div>
              </DropdownMenuItem>
              {index < notifications.length - 1 && <DropdownMenuSeparator className="mx-2 my-1" />}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-10 w-10 text-muted/30 mb-2" />
            <p className="text-sm text-muted-foreground">All caught up!</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
