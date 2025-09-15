
"use client";

import { CheckCircle, PlusCircle, ShieldCheck } from "lucide-react";

type Activity = {
  id: number;
  action: "Verified" | "Claimed" | "Generated";
  credential: string;
  entity: string;
  time: string;
};

const actionIcons = {
  Verified: CheckCircle,
  Claimed: PlusCircle,
  Generated: ShieldCheck,
};

export default function ActivityItem({ activity }: { activity: Activity }) {
  const Icon = actionIcons[activity.action] || ShieldCheck;

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="font-semibold truncate">
          <span className="text-primary">{activity.action}</span> {activity.credential}
        </p>
        <p className="text-sm text-muted-foreground">
          For {activity.entity} &bull; {activity.time}
        </p>
      </div>
    </div>
  );
}
