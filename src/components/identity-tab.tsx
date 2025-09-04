import { Award, FileText, Fingerprint, GraduationCap, ShieldCheck, UserCheck, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export default function IdentityTab() {
  const credentials = [
    { name: "Proof of Age", issuer: "Govt. Issued", icon: UserCheck, verified: true },
    { name: "B.Sc. Degree", issuer: "State University", icon: GraduationCap, verified: true },
    { name: "Professional License", issuer: "Medical Board", icon: Award, verified: false },
  ];

  const recentActivity = [
    { action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
  ];

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Fingerprint className="text-primary" />
            Your Digital ID
          </CardTitle>
          <CardDescription>
            Your unique and self-sovereign identity on the xIDFI ecosystem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="break-all rounded-md bg-muted p-3 text-xs font-mono text-muted-foreground">
            did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d
          </div>
          <Button className="mt-4 w-full">Create/Manage Identity</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" className="h-auto flex-col gap-1 py-3">
          <FileText className="h-5 w-5" />
          <span className="text-xs">Claim</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-1 py-3">
          <UserCheck className="h-5 w-5" />
          <span className="text-xs">Verify</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-1 py-3">
          <ShieldCheck className="h-5 w-5" />
          <span className="text-xs">ZK Proof</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Credentials</CardTitle>
          <CardDescription>All your digital credentials in one place.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {credentials.map((cred) => (
            <div key={cred.name} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <cred.icon className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{cred.name}</p>
                <p className="text-sm text-muted-foreground">{cred.issuer}</p>
              </div>
              <Badge variant={cred.verified ? "accent" : "secondary"}>
                {cred.verified ? "Verified" : "Pending"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivity.map((activity, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-primary">{activity.action}</span> {activity.credential}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    For {activity.entity} &bull; {activity.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
