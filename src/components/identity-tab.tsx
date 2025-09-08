
"use client";

import { Award, FileText, Fingerprint, GraduationCap, PlusCircle, UserCheck, Shield, BookUser, Filter, ChevronDown, Bitcoin } from "lucide-react";
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import CryptoCredentialCard from "./crypto-credential-card";
import ManageCryptoCredentialsDialog from "./manage-crypto-credentials-dialog";

type FilterType = 'all' | 'active' | 'expired' | 'revoked';

export default function IdentityTab() {
  const [governmentFilter, setGovernmentFilter] = useState<FilterType>('all');
  const [licensesFilter, setLicensesFilter] = useState<FilterType>('all');
  const [academicFilter, setAcademicFilter] = useState<FilterType>('all');

  const governmentCredentials = [
    { credentialType: "Passport", country: "USA", name: "John Doe", dob: "1990-05-15", issueDate: "2020-01-20", expiryDate: "2030-01-19", passportNumber: "A1B2C3D4", gradient: "from-blue-600 to-sky-500", status: "active" as const },
    { credentialType: "National ID", country: "Canada", name: "Jane Smith", dob: "1988-09-22", issueDate: "2017-03-10", expiryDate: "2022-03-09", nationalIdNumber: "123-456-789", gradient: "from-red-600 to-rose-500", status: "expired" as const },
    { credentialType: "Passport", country: "UK", name: "Peter Jones", dob: "1985-11-02", issueDate: "2015-06-01", expiryDate: "2020-05-31", passportNumber: "X9Y8Z7W6", gradient: "from-gray-600 to-slate-500", status: "revoked" as const },
  ];

  const licenseCredentials = [
    { licenseType: "Driver's License", issuingAuthority: "State of CA", name: "John Doe", issueDate: "2021-08-15", expiryDate: "2029-08-15", licenseNumber: "D1234567", details: ["Class: C"], gradient: "from-green-600 to-emerald-500", status: "active" as const },
    { licenseType: "Boating License", issuingAuthority: "Maritime Authority", name: "Jane Smith", issueDate: "2018-06-01", expiryDate: "2023-06-01", licenseNumber: "B9876543", gradient: "from-cyan-600 to-teal-500", status: "expired" as const },
    { licenseType: "Medical License", issuingAuthority: "Medical Board", name: "Dr. Emily White", issueDate: "2019-07-20", expiryDate: "2025-07-20", licenseNumber: "M555444", gradient: "from-rose-600 to-pink-500", status: "revoked" as const },
  ];

  const academicCredentials = [
    { credentialType: "Bachelor's Degree", institution: "State University", fieldOfStudy: "Computer Science", graduationDate: "2022-05-20", gradient: "from-purple-600 to-indigo-500", status: "active" as const },
    { credentialType: "Professional Certificate", institution: "Tech Institute", fieldOfStudy: "Project Management", graduationDate: "2019-05-20", gradient: "from-fuchsia-600 to-pink-500", status: "active" as const },
  ];

  const recentActivity = [
    { action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
  ];

  const filteredGovernmentCredentials = governmentCredentials.filter(cred => {
    if (governmentFilter === 'all') return true;
    return cred.status === governmentFilter;
  });

  const filteredLicenseCredentials = licenseCredentials.filter(cred => {
    if (licensesFilter === 'all') return true;
    return cred.status === licensesFilter;
  });

  const filteredAcademicCredentials = academicCredentials.filter(cred => {
    if (academicFilter === 'all') return true;
    return cred.status === academicFilter;
  });
  
  const FilterDropdown = ({ filter, setFilter }: { filter: FilterType, setFilter: (filter: FilterType) => void }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="capitalize">
          {filter}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setFilter('all')}>All</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFilter('active')}>Active</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFilter('expired')}>Expired</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFilter('revoked')}>Revoked</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-headline font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Government
          </h2>
          <FilterDropdown filter={governmentFilter} setFilter={setGovernmentFilter} />
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {filteredGovernmentCredentials.length > 0 ? filteredGovernmentCredentials.map((cred, index) => (
              <CarouselItem key={index}>
                <GovernmentCredentialCard {...cred} />
              </CarouselItem>
            )) : <CarouselItem><p className="text-sm text-muted-foreground text-center py-4">No credentials match the filter.</p></CarouselItem>}
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
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-headline font-semibold flex items-center gap-2">
              <BookUser className="h-5 w-5 text-primary" />
              Licenses
            </h2>
            <FilterDropdown filter={licensesFilter} setFilter={setLicensesFilter} />
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {filteredLicenseCredentials.length > 0 ? filteredLicenseCredentials.map((cred, index) => (
              <CarouselItem key={index}>
                <LicenseCredentialCard {...cred} />
              </CarouselItem>
            )) : <CarouselItem><p className="text-sm text-muted-foreground text-center py-4">No credentials match the filter.</p></CarouselItem>}
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
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-headline font-semibold flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Academic
          </h2>
          <FilterDropdown filter={academicFilter} setFilter={setAcademicFilter} />
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {filteredAcademicCredentials.length > 0 ? filteredAcademicCredentials.map((cred, index) => (
              <CarouselItem key={index}>
                <AcademicCredentialCard {...cred} />
              </CarouselItem>
            )) : <CarouselItem><p className="text-sm text-muted-foreground text-center py-4">No credentials match the filter.</p></CarouselItem>}
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
