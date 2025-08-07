import { useNavigate, Outlet } from "react-router-dom";
import TenantsTable from "../components/Table";
import FormDialog from "../components/ui/FormDialog";
import { useState } from "react";

export default function Tenants() {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleNewTenant() {
    setIsOpen(true);
  }

  function handleTenantAdded() {
    setRefreshTrigger((prev) => prev + 1);
    setIsOpen(false);
  }

  return (
    <>
      <div className="w-full h-full bg-[#f7f5f4] flex flex-col">
        <div className="flex justify-between items-center p-4 flex-shrink-0">
          <h1 className="text-2xl font-bold">Tenants List</h1>
          <button
            onClick={handleNewTenant}
            className="bg-[#5E81F4] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Tenant
          </button>
        </div>
        <div className="flex-1 p-4 pt-0">
          <TenantsTable refreshTrigger={refreshTrigger} />
        </div>
      </div>
      <FormDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onTenantAdded={handleTenantAdded}
      />
    </>
  );
}
