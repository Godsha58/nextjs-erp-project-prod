"use client";
import Input from "@/components/input";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import DynamicTable from "@/components/DynamicTable";

import { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import styles from "@/app/finance/page.module.css"; 

export default function PendingToPayPage() {
  const [description, setDescription] = useState("");
 
const warehouseOptions = [
  { label: 'Site 1', value: 'site1' },
  { label: 'Site 2', value: 'site2' },
  { label: 'Site 3', value: 'site3' },
];

const columns = [
  { key: 'id', label: 'Order Id', type: 'text' },
  { key: 'Product', label: 'Product', type: 'text' },
  { key: 'Status', label: 'Status', type: 'text' },
  { key: 'DueDate', label: 'Due Date', type: 'text' },
  { key: 'PayDate', label: 'Pay Date', type: 'text' },
  { key: 'Actions', label: 'Actions', type: 'action' },
];

const data = [
  {
    id: 'O001',
    OrderId: 'O001',
    Product: 'LED Lights',
    Status: 'Pending',
    DueDate: '2025-06-10',
    PayDate: '',
    select: false,
    active: true,
  },
  {
    id: 'O002',
    OrderId: 'O002',
    Product: 'Wireless Mouse',
    Status: 'Paid',
    DueDate: '2025-05-20',
    PayDate: '2025-05-18',
    select: false,
    active: false,
  },
  {
    id: 'O003',
    OrderId: 'O003',
    Product: 'Mechanical Keyboard',
    Status: 'Overdue',
    DueDate: '2025-06-01',
    PayDate: '',
    select: false,
    active: true,
  },
  {
    id: 'O004',
    OrderId: 'O004',
    Product: 'USB-C Cable',
    Status: 'Paid',
    DueDate: '2025-05-30',
    PayDate: '2025-05-30',
    select: false,
    active: true,
  },
];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías manejar el envío del formulario
  };


  return (
    <main className={`${styles.div_principal}`}>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.div_principal_top} flex gap-4 mb-6 items-center`}> {/* Div principal top*/}
          <div className={`${styles.div_busqueda}flex mb-6 items-center `}> {/* busqueda */}
            <label className="text-[#8b0f14] font-bold" style={{alignSelf: "flex-start"}}>Order ID:</label>
            <div className={`${styles.div_hijo_busqueda}`}> {/* Hijo de busqueda Contenedor de input y botón */}
              <Input
                name="Search"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Id order"
                required
              />
              <Dropdown options={warehouseOptions} placeholder="Select Warehouse" />
              <Button
                label={
                  <div className="flex items-center gap-2">
                    <FaSearch className="w-4 h-4" />
                  </div>
                }
                className="bg-[#a01217] text-white hover:bg-[#8b0f14] transition-colors p-2 w-fit h-fit"
                onClick={() => alert("Search")}
              />
            </div>
          </div>

          <div className={`${styles.div_busqueda}flex items-end `} > {/* excel */}
              <Button
                label={
                  <div className="flex items-center gap-2">
                    <FaFileExcel className="w-4 h-4" />
                    <span> Excel</span>
                  </div>
                }
                className="bg-[#a01217] text-white hover:bg-[#8b0f14] transition-colors p-2 w-fit h-fit"
                onClick={() => alert("Excel")}
              />
            
          </div>
        </div>
      </form>

      <DynamicTable
                    data={data}
                    columns={columns}
                    
                  />
    </main>
  );
}
