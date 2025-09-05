import { Award, FileText, Fingerprint, GraduationCap, PlusCircle, UserCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function IdentityTab() {
  const activeCredentials = [
    { name: "Proof of Age", issuer: "Govt. Issued", icon: UserCheck, verified: true },
    { name: "B.Sc. Degree", issuer: "State University", icon: GraduationCap, verified: true },
    { name: "Professional License", issuer: "Medical Board", icon: Award, verified: false },
  ];

  const expiredCredentials = [
    { name: "Old Conference Pass", issuer: "Tech Summit '23", icon: FileText, verified: false },
  ];

  const revokedCredentials = [
     { name: "Old Driver's License", issuer: "Dept. of Motor Vehicles", icon: UserCheck, verified: false },
  ];

  const recentActivity = [
    { action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
  ];

  const CredentialList = ({ credentials }: { credentials: typeof activeCredentials }) => (
    <div className="space-y-4 pt-4">
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
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
           <div className="flex items-center justify-between">
            <CardTitle className="font-headline flex items-center gap-2">
              <Fingerprint className="text-primary" />
              Your Digital ID
            </CardTitle>
            <Button variant="ghost" size="icon">
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">Create Credential</span>
            </Button>
          </div>
          <CardDescription>
            Your unique and self-sovereign.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="break-all rounded-md bg-muted p-3 text-xs font-mono text-muted-foreground">
            did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Credentials</CardTitle>
          <CardDescription>All your digital credentials in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
              <TabsTrigger value="revoked">Revoked</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <CredentialList credentials={activeCredentials} />
            </TabsContent>
            <TabsContent value="expired">
              <CredentialList credentials={expiredCredentials} />
            </TabsContent>
            <TabsContent value="revoked">
              <CredentialList credentials={revokedCredentials} />
            </TabsContent>
          </Tabs>
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
