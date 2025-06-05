'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import DynamicTable from '@/components/DynamicTable';
import styles from './page.module.css';

const columns = [
  { key: 'select', label: '', type: 'checkbox' },
  { key: 'id', label: 'ID Product', type: 'text' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'price', label: 'Price', type: 'text' },
  { key: 'active', label: 'Active', type: 'switch' },
];

const data = [
  {
    select: false,
    id: 'P001',
    name: 'Lights',
    description: 'LED Front Lights',
    price: '$450',
    active: true,
  },
  {
    select: false,
    id: 'P002',
    name: 'Mouse',
    description: 'Wireless ergonomic mouse',
    price: '$50',
    active: false,
  },
  {
    select: false,
    id: 'P003',
    name: 'Keyboard',
    description: 'Mechanical keyboard',
    price: '$120',
    active: true,
  },
];

const warehouseOptions = [
  { label: 'Site 1', value: 'site1' },
  { label: 'Site 2', value: 'site2' },
  { label: 'Site 3', value: 'site3' },
];

const productTypeOptions = [
  { label: 'Product 1', value: 'product1' },
  { label: 'Product 2', value: 'product2' },
  { label: 'Product 3', value: 'product3' },
];

const supplierOptions = [
  { label: 'Supplier 1', value: 'supplier1' },
  { label: 'Supplier 2', value: 'supplier2' },
  { label: 'Supplier 3', value: 'supplier3' },
];

export default function InventoryPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="flex">
      <div className={`flex flex-col flex-1 ${styles.contentBackground}`}>
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-black">Inventory Module</h1>

          {/* Dropdowns arriba de la tabla */}
          <div className="flex gap-4 mb-6">
            <Dropdown options={warehouseOptions} placeholder="Select Warehouse" />
            <Dropdown options={productTypeOptions} placeholder="Select Product Type" />
            <Dropdown options={supplierOptions} placeholder="Select Supplier" />
          </div>

          <DynamicTable
            data={data}
            columns={columns}
            onSelectedRowsChange={(ids) => setSelectedIds(ids)}
          />

          <div className="mt-4 flex flex-wrap gap-4">
            <Button
              label="Remove"
              onClick={() => {
                console.log('IDs seleccionados para eliminar:', selectedIds);
                alert('Eliminar: ' + selectedIds.join(', '));
              }}
            />
            <Button label="Register product" onClick={() => alert('Register product')} />
            <Button label="Register entry" onClick={() => alert('Register entry')} />
            <Button label="Change warehouse" onClick={() => alert('Change warehouse')} />
          </div>
        </main>
      </div>
    </div>
  );
}
