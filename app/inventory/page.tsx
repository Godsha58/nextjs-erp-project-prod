'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import DynamicTable from '@/components/DynamicTable';
import AlertDialog from '@/components/AlertDialog';
import styles from './page.module.css';
import { GoAlertFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import DynamicFormModal from '@/components/DynamicFormModal';
import { Field } from '@/components/DynamicFormModal';

const columns = [
  { key: 'select', label: '', type: 'checkbox' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'brand', label: 'Brand', type: 'text' },
  { key: 'warehouse_name', label: 'Warehouse', type: 'text'},
  { key: 'supplier_name', label: 'Supplier', type: 'text'},
  { key: 'category_name', label: 'Type', type: 'text'},
  { key: 'stock', label: 'Quantity', type: 'text' },
  { key: 'sale_price', label: 'Price', type: 'text' },
  { key: 'active', label: 'Active', type: 'switch' },
];

export default function InventoryPage() {

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [productState, setProductState] = useState<{ id: string; active: boolean }[]>([]);
  const [tableData, setTableData] = useState<FilteredProducts[]>([]);
  const [warehouseList, setWarehouseList] = useState<Option[]>([]);
  const [suppliersList, setSuppliersList] = useState<Option[]>([]);
  const [productTypeList, setProductTypeList] = useState<Option[]>([]);

  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [inputValue, setInputValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<FilteredProducts[]>([]);
  const [filteredByDropdown, setFilteredByDropdown] = useState<FilteredProducts[]>([]);
  interface FilteredProducts {
  select: boolean;
  id: string;
  product_id: number;
  warehouse_id: number;
  name: string;
  description: string;
  sku: string;
  category_id: number;
  brand: string;
  measure_unit: string;
  cost_price: number;
  sale_price: number;
  active: boolean;
  stock: number;
  supplier_name: string;
  warehouse_name: string;
  category_name: string;
}

interface Option {
  label: string;
  value: string;
}

const productFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'brand', label: 'Brand', type: 'text' },
    { name: 'warehouse_name', label: 'Warehouse', type: 'select', options: warehouseList },
    { name: 'supplier_name', label: 'Supplier', type: 'select', options: suppliersList },
    { name: 'category_name', label: 'Type', type: 'select', options: productTypeList },
    { name: 'stock', label: 'Quantity', type: 'number' },
    { name: 'sale_price', label: 'Price', type: 'number' },
    { name: 'active', label: 'Active', type: 'switch' },
  ] satisfies Field[];

  useEffect(() => {
    fetch('/api/inventory/products')
      .then(res => res.json())
      .then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const transformed = data.map((item: any) => ({
            select: true,
            id: item.product_id.toString(),
            product_id: item.product_id,
            warehouse_id: item.warehouse_id,
            name: item.name,
            description: item.description,
            sku: item.sku,
            category_id: item.category_id,
            brand: item.brand,
            measure_unit: item.measure_unit,
            cost_price: item.cost_price,
            sale_price: item.sale_price,
            active: item.active,
            stock: item.stock,
            supplier_name: item.supplier_name,
            warehouse_name: item.warehouse_name,
            category_name: item.category_name
          }));
          setTableData(transformed);
        }
      );
  }, []);

  useEffect(() => {
  let filtered = [...tableData];

  if (selectedWarehouse) {
  filtered = filtered.filter(item =>
    item.warehouse_name === selectedWarehouse
  );
}

  if (selectedCategory) {
  filtered = filtered.filter(item =>
    item.category_name === selectedCategory
  );
}

  if (selectedSupplier) {
  filtered = filtered.filter(item =>
    item.supplier_name === selectedSupplier
  );
}

  setFilteredByDropdown(filtered);
  setFilteredData(filtered);
  setCurrentPage(1);
}, [selectedWarehouse, selectedCategory, selectedSupplier, tableData]);

  useEffect(() => {
  const warehouses = Array.from(
  new Set(tableData.map(p => p.warehouse_name))
).map(name => ({
  label: name,
  value: name,
}));
setWarehouseList(warehouses);

const categories = Array.from(
  new Set(tableData.map(p => p.category_name))
).map(name => ({
  label: name,
  value: name,
}));
setProductTypeList(categories);

const suppliers = Array.from(
  new Set(tableData.map(p => p.supplier_name))
).map(name => ({
  label: name,
  value: name,
}));
setSuppliersList(suppliers);
}, [tableData]);

  useEffect(() => {
  if (!inputValue.trim()) {
    setFilteredData(filteredByDropdown);
    return;
  }

  const query = inputValue.toLowerCase();
  const result = tableData.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  setFilteredData(result);
  setCurrentPage(1);
}, [inputValue, tableData, filteredByDropdown]);

useEffect(() => {

  console.log("Cantidad de ids seleccionadas: "+ selectedIds.length);
  

  if (selectedIds.length > 0) {
    setShowRemove(true);
  }else{
    setShowRemove(false);
  }
},[selectedIds]); 

useEffect(() => {
  if (productState.length === 0) return;

  const updateActiveStatus = async () => {
    try {
      const res = await fetch('/api/inventory/update-active', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productState),
      });

      const result = await res.json();

      if (result.success) {
        fetch('/api/inventory/products')
      .then(res => res.json())
      .then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const transformed = data.map((item: any) => ({
            select: true,
            id: item.product_id.toString(),
            product_id: item.product_id,
            warehouse_id: item.warehouse_id,
            name: item.name,
            description: item.description,
            sku: item.sku,
            category_id: item.category_id,
            brand: item.brand,
            measure_unit: item.measure_unit,
            cost_price: item.cost_price,
            sale_price: item.sale_price,
            active: item.active,
            stock: item.stock,
            supplier_name: item.supplier_name,
            warehouse_name: item.warehouse_name,
            category_name: item.category_name
          }));
          setTableData(transformed);
        }
      );
      }else{
        console.error("Error updating products", result.errors);
      }
    } catch (error) {
      console.error("Error calling API", error);
    }
  };
  updateActiveStatus();
}, [productState]);

useEffect(() => {
  if (!shouldDelete || selectedIds.length === 0) return;

  const removeProduct = async () => {
    try {
      const res = await fetch('/api/inventory/remove-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedIds),
      });
      const result = await res.json();
      if (result.success) {
        const res = await fetch('/api/inventory/products');
        const data = await res.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformed = data.map((item: any) => ({
          select: true,
          id: item.product_id.toString(),
          product_id: item.product_id,
          warehouse_id: item.warehouse_id,
          name: item.name,
          description: item.description,
          sku: item.sku,
          category_id: item.category_id,
          brand: item.brand,
          measure_unit: item.measure_unit,
          cost_price: item.cost_price,
          sale_price: item.sale_price,
          active: item.active,
          stock: item.stock,
          supplier_name: item.supplier_name,
          warehouse_name: item.warehouse_name,
          category_name: item.category_name
        }));

        setTableData(transformed);
        setSelectedIds([]);         
        setShouldDelete(false);     
      } else {
        console.error("Error updating products", result.errors);
      }
    } catch (error) {
      console.error("Error calling API", error);
    }
  };

  removeProduct();
}, [shouldDelete, selectedIds]);

  return (
    <div className="flex">
      <div className={`flex flex-col flex-1 ${styles.contentBackground}`}>
        <h1 className="text-2xl font-bold mb-4 text-black">Inventory Module</h1>
        <div className="flex gap-4 mb-6">
          {
            showAlertDialog && (
              <AlertDialog
                title='alerta'
                icon={<GoAlertFill className="w-10 h-10" />}
                content='¿Está seguro que quiere eliminar el siguiente producto de la base de datos?'
                onSuccess={() => setShouldDelete(true)}
                onCancel={() => setShowAlertDialog(false)}
                />
            )
          }
          <Dropdown 
            options={warehouseList} 
            placeholder="Select Warehouse"
            onSelect={value => setSelectedWarehouse(value)}
            value={selectedWarehouse}
          />
          <Dropdown 
            options={productTypeList} 
            placeholder="Select Product Type"
            onSelect={value => setSelectedCategory(value)} 
            value={selectedCategory}
          />
          <Dropdown 
            options={suppliersList} 
            placeholder="Select Supplier"
            onSelect={value => setSelectedSupplier(value)}
            value={selectedSupplier} 
          />
          <Button
            label="Clear Filters"
            onClick={() => {
              setSelectedWarehouse(null);
              setSelectedCategory(null);
              setSelectedSupplier(null);
              setInputValue('');
              setCurrentPage(1);
            }}
          />
          <div className="flex items-center gap-2">
            <label className="text-[#8b0f14] font-bold">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-300 rounded px-2 py-1 w-64"
              value={inputValue}
              onFocus={() => {
                setSelectedWarehouse(null);
                setSelectedCategory(null);
                setSelectedSupplier(null);
              }}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <Button
              label={
                <div className="flex items-center gap-2">
                  <FaSearch className="w-4 h-4"/>
                </div>
              }
              className="bg-[#a01217] text-white hover:bg-[#8b0f14] transition-colors p-2 w-fit h-fit"
              onClick={() => {}}
            />
          </div>
        </div>

        <DynamicTable
          data={filteredData}
          columns={columns}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSelectedRowsChange={ids => setSelectedIds(ids)}
          onActiveChange={(states) => setProductState(states)}
        />

        <div className="mt-4 flex flex-wrap gap-4">
          {showRemove &&(
            <Button
            label="Remove"
            onClick={() => {
              setShowAlertDialog(true);
            }}
          />
          )}
          <Button label="Register product" onClick={() => setShowProductModal(true)} />
          <Button label="Register entry" onClick={() => alert('Register entry')} />
          <Button label="Change warehouse" onClick={() => alert('Change warehouse')} />
        </div>
        {showProductModal && (
          <DynamicFormModal
            title="Register New Product"
            isOpen={showProductModal}
            onClose={() => setShowProductModal(false)}
            fields={productFields}
            onSubmit={(data) => {
              console.log("Form submitted with:", data);
            }}
          />
        )}
      </div>
    </div>
  );
}
