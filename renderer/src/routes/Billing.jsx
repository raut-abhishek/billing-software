import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ventarLogo from "../assets/ventar.png";
import { generatePdf } from "../utils/generatePdf";

export default function Billing() {
  const navigate = useNavigate();

  // Customer state
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    GSTIN:""
  });
  
  // Items state
  const [items, setItems] = useState([
    { id: Date.now(), name: "", qty: 1, rate: 0, gst: 0 },
  ]);
  
  // Calculations
  const calculateItemTotal = (item) => {
    const baseAmount = item.qty * item.rate;
    const gstAmount = (baseAmount * item.gst) / 100;
    return baseAmount + gstAmount;
  };
  
  //Validation
  const isItemValid = function (item){
    return(
      item.name.trim() !== "" &&
      item.qty > 0 &&
      item.rate > 0 &&
      item.gst >= 0 &&
      item.gst <= 28
    )
  }

  const validItems = items.filter(isItemValid);



  const grandTotal = validItems.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  
  const invoicePayload = {
    customer,
    items: validItems.map((item) => ({
      ...item,
      total: calculateItemTotal(item),
    })),
    grandTotal,
    createdAt: new Date().toISOString(),
  };
  
  console.log("Invoice Payload:", invoicePayload);



  // Handlers
  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };




  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (field === "qty") return { ...item, qty: Math.max(1, value) };
        if (field === "rate") return { ...item, rate: Math.max(0, value) };
        if (field === "gst")
          return { ...item, gst: Math.min(28, Math.max(0, value)) };

        return { ...item, [field]: value };
      })
    );
  };




  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: "", qty: 1, rate: 0, gst: 0 },
    ]);
  };



  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };



  
  const isInvoiceValid =
  customer.name.trim() !== "" && validItems.length > 0;
  
  
  const openPreview = (type) => {
  navigate(`/preview/${type}`, {
    state: invoicePayload,
  });
};
  


  return (
    <div className="min-h-screen bg-(--brand-bg) flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={ventarLogo} alt="Logo" className="h-20 w-auto" />
          <h1 className="font-semibold text-lg">Billing</h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          Back
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          {/* Customer Details */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="name"
                value={customer.name}
                onChange={handleCustomerChange}
                placeholder="Customer Name"
                className="border rounded-lg px-3 py-2"
              />
              <input
                name="phone"
                value={customer.phone}
                onChange={handleCustomerChange}
                placeholder="Phone Number"
                className="border rounded-lg px-3 py-2"
              />
              <input
                name="email"
                value={customer.email}
                onChange={handleCustomerChange}
                placeholder="Email Address"
                className="border rounded-lg px-3 py-2"
              />
              <input
                name="GSTIN"
                value={customer.gstin}
                onChange={handleCustomerChange}
                placeholder="Customer GSTIN"
                className="border rounded-lg px-3 py-2"
              />
            </div>
          </section>

          {/* Items */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Items</h2>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-13 bg-gray-100 px-4 py-2 text-sm font-medium">
                <div className="col-span-4">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-2 text-center">GST %</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-1 text-center">✕</div>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-13 px-4 py-3 border-t text-sm items-center"
                >
                  <div className="col-span-4">
                    <input
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(item.id, "name", e.target.value)
                      }
                      placeholder="Item name"
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>

                  <div className="col-span-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(item.id, "qty", Number(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                  </div>

                  <div className="col-span-2 text-right">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(item.id, "rate", Number(e.target.value))
                      }
                      className="w-24 border rounded px-2 py-1 text-right"
                    />
                  </div>

                  <div className="col-span-2 text-center">
                    <input
                      type="number"
                      value={item.gst}
                      onChange={(e) =>
                        handleItemChange(item.id, "gst", Number(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                  </div>

                  <div className="col-span-2 text-right font-medium">
                    {calculateItemTotal(item).toFixed(2)}
                  </div>

                  <div
                    onClick={() => removeItem(item.id)}
                    className="col-span-1 text-center text-red-500 cursor-pointer"
                  >
                    ✕
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addItem}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              + Add Item
            </button>
          </section>

          {/* Summary */}
          <section className="text-right text-gray-700 mr-10 space-y-1">
            <div className="text-lg font-semibold">
              Grand Total: ₹ {grandTotal.toFixed(2)}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-4 flex justify-end gap-4">

        <button
        disabled={!isInvoiceValid}
        onClick={() => openPreview("bill")}
        className={`px-4 py-2 rounded-lg text-white ${isInvoiceValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          View Bill
        </button>

        <button
        disabled={!isInvoiceValid}
        onClick={() => openPreview("quotation")}
        className={`px-4 py-2 rounded-lg text-white ${isInvoiceValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          View Quotation
        </button>

        <button
        disabled={!isInvoiceValid}
        onClick={() => openPreview("invoice")}
        className={`px-4 py-2 rounded-lg text-white  ${isInvoiceValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          View Invoice
        </button>

      </footer>

    </div>
  );
}
