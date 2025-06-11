'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import DynamicTable from '@/components/DynamicTable';
import styles from './page.module.css';

const columns = [
  { key: 'select', label: '', type: 'checkbox' },
  { key: 'product_id', label: 'ID Product', type: 'text' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'stock', label: 'Quantity', type: 'text' },
  { key: 'sale_price', label: 'Price', type: 'text' },
  { key: 'active', label: 'Active', type: 'switch' },
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
  const [tableData, setTableData] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);

  useEffect(() => {
    fetch('/api/inventory/warehouses')
      .then(res => res.json())
      .then(data => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const warehouse_list = data.map((item: any) => ({
          label: item.name,
          value: item.name
        }));

        setWarehouseList(warehouse_list);

      });
  },[]);

  useEffect(() => {
  console.log("useEffect ejecutado");

  fetch('/api/inventory/products')
    .then(res => res.json())
    .then(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformed = data.map((item: any) => ({
        id: item.product_id.toString(),
        product_id: item.product_id.toString(),  // convierte a string
        select: true,                   // valor inicial para el checkbox
        name: item.name,
        description: item.description,
        stock: item.stock,
        sale_price: item.sale_price,
        active: item.active,
      }));

      console.log('Datos transformados:', transformed);
      setTableData(transformed);
    });

    fetch('')
}, []);

  return (
    <div className="flex">
      <div className={`flex flex-col flex-1 ${styles.contentBackground}`}>
        <h1 className="text-2xl font-bold mb-4 text-black">Inventory Module</h1>

        {/* Dropdowns arriba de la tabla */}
        <div className="flex gap-4 mb-6">
          <Dropdown options={warehouseList} placeholder="Select Warehouse" />
          <Dropdown options={productTypeOptions} placeholder="Select Product Type" />
          <Dropdown options={supplierOptions} placeholder="Select Supplier" />
        </div>

        {/* Tabla dinámica lista para llenarse */}
        <DynamicTable
          data={tableData}
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
      </div>
    </div>
  );
}
