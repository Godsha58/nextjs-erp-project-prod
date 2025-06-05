"use client";

import {FaArrowRight} from "react-icons/fa";
import Card from "@/components/Card";

import { useRouter } from 'next/navigation';
import styles from "./page.module.css"; 
export default function FinancePage() {
  const router = useRouter();

  return (
    <main className={`${styles.div_principal}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          label="Pending to Pay"
          buttonLabel={
            <div className="flex items-center gap-2">
              <FaArrowRight className="w-4 h-4" />
              <span>View Details</span>
            </div>
          }
          onButtonClick={() => router.push('/finance/pending-to-pay')}
        />
      </div>
    </main>
  );
}
