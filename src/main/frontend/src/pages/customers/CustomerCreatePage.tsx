import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageContainer, PageHeader, PageContent } from '@components/layout';
import { FormWrapper, FormField, FormActions } from '@components/forms';
import { Input, Button } from '@components/ui';
import { useForm, useToast } from '@hooks';
import { customerValidationRules } from '../../utils/validation';
import { customerService } from '../../services/customerService';
import type { CustomerDto } from '../../api/models';

interface CustomerFormData {
  customerName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

/**
 * Customer Create page component
 * Allows users to create a new customer with validation and error handling
 */
const CustomerCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();

  const initialValues: CustomerFormData = {
    customerName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
  };

  const {
    values,
    errors,
    isValid,
    isSubmitting,
    setValue,
    handleSubmit,
  } = useForm({
    initialValues,
    validationRules: {
      customerName: customerValidationRules.customerName,
      email: customerValidationRules.email,
    },
    onSubmit: async (formData) => {
      try {
        const customerData: Omit<CustomerDto, 'id' | 'version' | 'createdDate' | 'updateDate'> = {
          customerName: formData.customerName,
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          addressLine1: formData.addressLine1 || undefined,
          addressLine2: formData.addressLine2 || undefined,
          city: formData.city || undefined,
          state: formData.state || undefined,
          postalCode: formData.postalCode || undefined,
        };

        const createdCustomer = await customerService.createCustomer(customerData);
        success(`Customer "${createdCustomer.customerName}" created successfully`);
        navigate(`/customers/${createdCustomer.id}`);
      } catch (err) {
        error('Failed to create customer. Please try again.');
        console.error('Error creating customer:', err);
      }
    },
  });

  const handleCancel = () => {
    navigate('/customers');
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create New Customer"
        subtitle="Add a new customer to your directory"
        actions={
          <Button variant="outline" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
        }
      />

      <PageContent>
        <FormWrapper onSubmit={handleSubmit} isLoading={isSubmitting}>
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  label="Customer Name"
                  required
                  error={errors.customerName?.[0]}
                  htmlFor="customerName"
                >
                  <Input
                    id="customerName"
                    placeholder="Enter customer name"
                    value={values.customerName}
                    onChange={(e) => setValue('customerName', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="Email"
                  error={errors.email?.[0]}
                  htmlFor="email"
                  helpText="Optional email address"
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={values.email}
                    onChange={(e) => setValue('email', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="Phone"
                  htmlFor="phone"
                  helpText="Optional phone number"
                >
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={values.phone}
                    onChange={(e) => setValue('phone', e.target.value)}
                  />
                </FormField>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Address Information</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  label="Address Line 1"
                  htmlFor="addressLine1"
                  helpText="Street address"
                >
                  <Input
                    id="addressLine1"
                    placeholder="Enter street address"
                    value={values.addressLine1}
                    onChange={(e) => setValue('addressLine1', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="Address Line 2"
                  htmlFor="addressLine2"
                  helpText="Apartment, suite, etc. (optional)"
                >
                  <Input
                    id="addressLine2"
                    placeholder="Apartment, suite, etc."
                    value={values.addressLine2}
                    onChange={(e) => setValue('addressLine2', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="City"
                  htmlFor="city"
                >
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={values.city}
                    onChange={(e) => setValue('city', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="State"
                  htmlFor="state"
                >
                  <Input
                    id="state"
                    placeholder="Enter state"
                    value={values.state}
                    onChange={(e) => setValue('state', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="Postal Code"
                  htmlFor="postalCode"
                >
                  <Input
                    id="postalCode"
                    placeholder="Enter postal code"
                    value={values.postalCode}
                    onChange={(e) => setValue('postalCode', e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          </div>

          <FormActions
            submitLabel="Create Customer"
            cancelLabel="Cancel"
            onCancel={handleCancel}
            isLoading={isSubmitting}
            submitDisabled={!isValid}
          />
        </FormWrapper>
      </PageContent>
    </PageContainer>
  );
};

export default CustomerCreatePage;
