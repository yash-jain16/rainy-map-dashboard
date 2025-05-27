
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const claimFormSchema = z.object({
  claimantName: z.string().min(2, 'Name must be at least 2 characters'),
  claimantEmail: z.string().email('Please enter a valid email address'),
  projectName: z.string().min(1, 'Project name is required'),
  claimAmount: z.string().min(1, 'Claim amount is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  declaration: z.boolean().refine((val) => val === true, {
    message: 'You must accept the warranty claim declaration',
  }),
});

type ClaimFormData = z.infer<typeof claimFormSchema>;

interface ClaimFormProps {
  projectName: string;
  actualRainyDays: number;
  predictedRainyDays: number;
}

export const ClaimForm: React.FC<ClaimFormProps> = ({
  projectName,
  actualRainyDays,
  predictedRainyDays,
}) => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<ClaimFormData>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      claimantName: '',
      claimantEmail: '',
      projectName: projectName,
      claimAmount: '',
      description: '',
      declaration: false,
    },
  });

  const onSubmit = async (data: ClaimFormData) => {
    try {
      console.log('Submitting claim form:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Warranty claim submitted successfully!');
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to submit claim. Please try again.');
    }
  };

  const excessDays = actualRainyDays - predictedRainyDays;

  return (
    <Card className="border-warning bg-warning-light/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning-dark" />
            <CardTitle className="text-warning-dark">Warranty Claim Available</CardTitle>
          </div>
          <Badge variant="outline" className="bg-warning text-warning-dark">
            +{excessDays} days
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Your project has exceeded the predicted rainy days by {excessDays} days. 
          You are eligible to submit a warranty claim for compensation.
        </p>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-warning hover:bg-warning/90 text-warning-foreground">
              <FileText className="mr-2 h-4 w-4" />
              Submit Warranty Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Submit Warranty Claim</DialogTitle>
              <DialogDescription>
                Complete this form to submit your warranty claim for excess rainy days.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="claimantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="claimantEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="claimAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Claim Amount ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter claim amount" {...field} />
                      </FormControl>
                      <FormDescription>
                        Amount you are claiming for the excess rainy days
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Claim Description</FormLabel>
                      <FormControl>
                        <textarea
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Describe the impact and reason for your warranty claim..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="declaration"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Warranty Claim Declaration
                        </FormLabel>
                        <FormDescription className="text-xs">
                          I declare that the information provided is accurate and complete. 
                          I understand that this claim will be reviewed and processed according 
                          to the warranty terms and conditions.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Claim'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
