import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageContainer, PageHeader, PageContent } from '@components/layout';
import { DataTable, TableFilters, TableActions, createCommonActions } from '@components/tables';
import { Button } from '@components/ui';
import { useToast, useConfirmationDialog } from '@hooks';
import { customerService } from '../../services/customerService';
import type { CustomerDto } from '../../api/models';
import type { Column, FilterValue } from '@components/tables';

/**
 * Customer listing page with pagination, filtering, and actions
 */
const CustomerListPage: React.FC = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { dialogState, confirmDelete } = useConfirmationDialog();

  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: 'customerName', direction: 'asc' as const });

  // Load customers data
  const loadCustomers = async () => {
    setLoading(true);
    try {
      // Extract filter values
      const searchFilter = filters.find(f => f.key === 'search');

      const response = await customerService.getAllCustomers(
        searchFilter?.value,
        pagination.page - 1, // API uses 0-based pagination
        pagination.pageSize
      );

      setCustomers(response.content || []);
      setPagination(prev => ({
        ...prev,
        total: response.totalElements || 0,
      }));
    } catch (err) {
      error('Failed to load customers');
      console.error('Error loading customers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount and when dependencies change
  useEffect(() => {
    loadCustomers();
  }, [pagination.page, pagination.pageSize, filters, sortConfig]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Handle page size change
  const handlePageSizeChange = (pageSize: number) => {
    setPagination(prev => ({ ...prev, pageSize, page: 1 }));
  };

  // Handle filters change
  const handleFiltersChange = (newFilters: FilterValue[]) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (customer: CustomerDto) => {
    confirmDelete(customer.customerName || 'this customer', async () => {
      try {
        await customerService.deleteCustomer(customer.id!);
        success(`Customer "${customer.customerName}" deleted successfully`);
        loadCustomers(); // Reload the list
      } catch (err) {
        error('Failed to delete customer');
        console.error('Error deleting customer:', err);
      }
    });
  };

  // Define table columns
  const columns: Column<CustomerDto>[] = [
    {
      key: 'customerName',
      header: 'Name',
      sortable: true,
      render: (value, customer) => (
        <div className="font-medium">
          <button
            onClick={() => navigate(`/customers/${customer.id}`)}
            className="text-primary hover:underline"
          >
            {value}
          </button>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      render: (value) => value || '-',
    },
    {
      key: 'phone',
      header: 'Phone',
      sortable: false,
      render: (value) => value || '-',
    },
    {
      key: 'city',
      header: 'City',
      sortable: true,
      render: (value) => value || '-',
    },
    {
      key: 'state',
      header: 'State',
      sortable: true,
      render: (value) => value || '-',
    },
    {
      key: 'createdDate',
      header: 'Created',
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString() : '-',
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      width: '100px',
      align: 'center',
      render: (_, customer) => (
        <TableActions
          row={customer}
          actions={createCommonActions({
            onView: (customer) => navigate(`/customers/${customer.id}`),
            onEdit: (customer) => navigate(`/customers/${customer.id}/edit`),
            onDelete: (customer) => handleDeleteCustomer(customer),
          })}
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Customers"
        subtitle="Manage your customer directory"
        actions={
          <Button onClick={() => navigate('/customers/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        }
      />

      <PageContent>
        <div className="space-y-4">
          {/* Filters */}
          <TableFilters
            filters={[]}
            values={filters}
            onFiltersChange={handleFiltersChange}
            searchPlaceholder="Search customers..."
          />

          {/* Data Table */}
          <DataTable
            data={customers}
            columns={columns}
            loading={loading}
            sortConfig={sortConfig}
            onSort={setSortConfig}
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            emptyMessage="No customers found. Create your first customer to get started."
          />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default CustomerListPage;
