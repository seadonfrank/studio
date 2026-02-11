"use client";

import { Bell, FileQuestion, HandCoins, Check, X, Share2, PlusCircle, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

const notifications = [
    {
        type: 'credential',
        title: 'Verification Request',
        description: 'Crypto Exchange Inc. is requesting "Proof of KYC" for account verification.',
        time: '5m ago'
    },
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

export default function NotificationsView({ onBack }: { onBack: () => void }) {
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
            case 'credential': return 'Cancel';
            case 'share': return 'Ignore';
            case 'issue': return 'Cancel';
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
        <div className="flex flex-col h-full bg-background">
            <div className="flex-1 px-4 space-y-2">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className="py-1">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/10 transition-colors">
                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <p className="font-bold text-sm leading-tight">{notification.title}</p>
                                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">{notification.time}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{notification.description}</p>
                                    <div className="flex gap-2 pt-1">
                                        <Button 
                                          size="sm" 
                                          className="h-8 px-4 rounded-full text-xs font-bold" 
                                          onClick={getActionHandler(notification.type)}
                                        >
                                            <Check className="mr-1.5 h-3.5 w-3.5" />
                                            {getActionLabel(notification.type)}
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          className="h-8 px-4 rounded-full text-xs font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/5" 
                                          onClick={handleDecline}
                                        >
                                          <X className="mr-1.5 h-3.5 w-3.5" />
                                          {getSecondaryActionLabel(notification.type)}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {index < notifications.length - 1 && <div className="h-px bg-border/40 mx-4 mt-2" />}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
                        <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center">
                            <Bell className="h-8 w-8 text-muted/30" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">All caught up!</p>
                            <p className="text-sm text-muted-foreground">We'll notify you when something important happens.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
