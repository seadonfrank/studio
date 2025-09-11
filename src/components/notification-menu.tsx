
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
import { Bell, FileQuestion, HandCoins } from "lucide-react";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";

const notifications = [
    {
        type: 'credential',
        title: 'Credential Request',
        description: 'Crypto Exchange Inc. is requesting your "Proof of KYC".',
        time: '5m ago'
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
    
    const handleDecline = () => {
        toast({
            title: "Request Declined",
            variant: "destructive"
        })
    }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-[10px]">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index}>
              <DropdownMenuItem className="flex !items-start gap-3 p-3 cursor-default focus:bg-accent">
                <div className="mt-1">
                    {notification.type === 'credential' ? <FileQuestion className="h-5 w-5 text-primary" /> : <HandCoins className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-1 space-y-2">
                    <p className="font-semibold text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <div className="flex gap-2">
                        <Button size="sm" className="h-7" onClick={notification.type === 'credential' ? handleProvide : handlePay}>
                            {notification.type === 'credential' ? 'Provide' : 'Pay'}
                        </Button>
                        <Button size="sm" variant="outline" className="h-7" onClick={handleDecline}>Decline</Button>
                    </div>
                </div>
              </DropdownMenuItem>
              {index < notifications.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-sm text-muted-foreground">No new notifications</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
