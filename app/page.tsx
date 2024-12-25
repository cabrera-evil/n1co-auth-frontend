'use client';

import ThreeDSAuthentication from '@/components/ThreeDSAuthentication';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthMessage } from '@/types/auth-message.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  url: z
    .string()
    .url('Please enter a valid URL')
    .nonempty('The URL is required'),
});

type FormValues = z.infer<typeof formSchema>;

const PaymentPage: React.FC = () => {
  const [auth, setAuth] = useState<AuthMessage | null>(null);
  const [showAuth, setShowAuth] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: FormValues) => {
    setShowAuth(true);
  };

  const authCallback = (payload: AuthMessage) => {
    setAuth(payload);
    setShowAuth(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
      case 'ERROR':
      case 'EXPIRED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
        3DS Authentication
      </h1>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="url"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="auth-url"
                    className="block text-gray-600 text-sm font-semibold mb-2"
                  >
                    Enter 3DS Authentication URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="auth-url"
                      placeholder="https://front-3ds.h4b.dev/authentication/..."
                      {...field}
                      className={`w-full p-3 border ${
                        fieldState.error ? 'border-red-500' : 'border-gray-300'
                      } rounded focus:outline-none focus:ring-2 ${
                        fieldState.error
                          ? 'focus:ring-red-500'
                          : 'focus:ring-blue-500'
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={`w-full py-3 mt-4 rounded font-semibold transition-colors ${
                form.formState.isSubmitting ? 'cursor-not-allowed' : ''
              }`}
            >
              {form.formState.isSubmitting ? (
                <span className="flex justify-center items-center text-white">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Starting Authentication...
                </span>
              ) : (
                'Start Authentication'
              )}
            </Button>
          </form>
        </Form>
      </div>
      {showAuth && (
        <div className="w-full max-w-lg mt-6 bg-white shadow-lg rounded-lg p-6">
          <ThreeDSAuthentication
            authUrl={form.getValues('url')}
            onAuthComplete={authCallback}
          />
        </div>
      )}
      {auth && (
        <div className="w-full max-w-lg mt-8 p-6 bg-white shadow-lg rounded-lg">
          <p className="text-lg font-medium">Authentication response:</p>
          <pre
            className={`mt-2 p-3 rounded-lg font-mono text-sm break-words whitespace-pre-wrap ${getStatusColor(
              auth.Status,
            )}`}
          >
            {JSON.stringify(auth, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
