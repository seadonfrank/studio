
import { Award, FileText, Fingerprint, GraduationCap, PlusCircle, UserCheck, Shield, BookUser } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import GovernmentCredentialCard from "./government-credential-card";
import AddAccountCard from "./add-account-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import LicenseCredentialCard from "./license-credential-card";
import ManageLicensesDialog from "./manage-licenses-dialog";
import AcademicCredentialCard from "./academic-credential-card";
import ManageAcademicCredentialsDialog from "./manage-academic-credentials-dialog";

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
  
  const governmentCredentials = [
    { credentialType: "Passport", country: "USA", name: "John Doe", dob: "1990-05-15", issueDate: "2020-01-20", expiryDate: "2030-01-19", passportNumber: "A1B2C3D4", gradient: "from-blue-600 to-sky-500" },
    { credentialType: "National ID", country: "Canada", name: "Jane Smith", dob: "1988-09-22", issueDate: "2022-03-10", expiryDate: "2027-03-09", nationalIdNumber: "123-456-789", gradient: "from-red-600 to-rose-500" },
  ];

  const licenseCredentials = [
    { licenseType: "Driver's License", issuingAuthority: "State of CA", name: "John Doe", issueDate: "2021-08-15", expiryDate: "2029-08-15", licenseNumber: "D1234567", details: ["Class: C"], gradient: "from-green-600 to-emerald-500" },
    { licenseType: "Boating License", issuingAuthority: "Maritime Authority", name: "Jane Smith", issueDate: "2023-06-01", expiryDate: "2028-06-01", licenseNumber: "B9876543", gradient: "from-cyan-600 to-teal-500" },
  ];

  const academicCredentials = [
    { credentialType: "Bachelor's Degree", institution: "State University", fieldOfStudy: "Computer Science", graduationDate: "2022-05-20", gradient: "from-purple-600 to-indigo-500" },
    { credentialType: "Master's Degree", institution: "Tech Institute", fieldOfStudy: "Artificial Intelligence", graduationDate: "2024-05-20", gradient: "from-fuchsia-600 to-pink-500" },
  ];

  const recentActivity = [
    { action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
  ];

  const CredentialList = ({ credentials }: { credentials: typeof activeCredentials }) => (
    <div className="space-y-4 pt-4">
      {credentials.map((cred) => (
        <Card key={cred.name}>
          <CardHeader className="flex flex-row items-center gap-4 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <cred.icon className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{cred.name}</p>
              <p className="text-sm text-muted-foreground">{cred.issuer}</p>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
             <Badge variant={cred.verified ? "accent" : "secondary"}>
              {cred.verified ? "Verified" : "Pending"}
            </Badge>
          </CardContent>
        </Card>
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
            Your unique and self-sovereign identity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="break-all rounded-md bg-muted p-3 text-xs font-mono text-muted-foreground">
            did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-lg font-headline font-semibold mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Government
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {governmentCredentials.map((cred, index) => (
              <CarouselItem key={index}>
                <GovernmentCredentialCard {...cred} />
              </CarouselItem>
            ))}
            <CarouselItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <AddAccountCard text="Add Credential" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Government Credential</DialogTitle>
                      <DialogDescription>
                        Securely add your government-issued credentials.
                      </DialogDescription>
                    </DialogHeader>
                    {/* Placeholder for a form component */}
                  </DialogContent>
                </Dialog>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      <section>
        <h2 className="text-lg font-headline font-semibold mb-3 flex items-center gap-2">
          <BookUser className="h-5 w-5 text-primary" />
          Licenses
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {licenseCredentials.map((cred, index) => (
              <CarouselItem key={index}>
                <LicenseCredentialCard {...cred} />
              </CarouselItem>
            ))}
            <CarouselItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <AddAccountCard text="Add License" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New License</DialogTitle>
                      <DialogDescription>
                        Add details for your new license credential.
                      </DialogDescription>
                    </DialogHeader>
                    <ManageLicensesDialog />
                  </DialogContent>
                </Dialog>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

       <section>
        <h2 className="text-lg font-headline font-semibold mb-3 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Academic
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {academicCredentials.map((cred, index) => (
              <CarouselItem key={index}>
                <AcademicCredentialCard {...cred} />
              </CarouselItem>
            ))}
            <CarouselItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <AddAccountCard text="Add Credential" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Academic Credential</DialogTitle>
                      <DialogDescription>
                        Add details for your new academic credential.
                      </DialogDescription>
                    </DialogHeader>
                    <ManageAcademicCredentialsDialog />
                  </DialogContent>
                </Dialog>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>


      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Credentials</CardTitle>
          <CardDescription>All your other digital credentials in one place.</CardDescription>
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
