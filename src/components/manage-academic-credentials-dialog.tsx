
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const academicSchema = z.object({
  credentialType: z.string().min(1, "Credential type is required"),
  institution: z.string().min(1, "Institution name is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  graduationDate: z.date({ required_error: "A graduation date is required." }),
});

type AcademicFormValues = z.infer<typeof academicSchema>;

export default function ManageAcademicCredentialsDialog() {
  const { toast } = useToast();

  const form = useForm<AcademicFormValues>({
    resolver: zodResolver(academicSchema),
  });

  function onSubmit(data: AcademicFormValues) {
    console.log(data);
    form.reset();
    toast({
      title: "Academic Credential Added",
      description: `Your ${data.credentialType} from ${data.institution} has been added.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="credentialType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credential Type</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="High School Diploma">High School Diploma</SelectItem>
                  <SelectItem value="Associate Degree">Associate Degree</SelectItem>
                  <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                  <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                  <SelectItem value="Doctorate (PhD)">Doctorate (PhD)</SelectItem>
                  <SelectItem value="Professional Certificate">Professional Certificate</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Name</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., State University" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field of Study</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="graduationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Graduation Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" className="w-full">Add Credential</Button>
      </form>
    </Form>
  );
}
