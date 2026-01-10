import { useLocation, useParams, useNavigate } from "react-router-dom";
import { generatePdf } from "../utils/generatePdf";
import ventarLogo from "../assets/ventar.png";

export default function Preview() {

  const { state } = useLocation();
  const { type } = useParams();
  const navigate = useNavigate();

  if (!state) return <h2>No data found</h2>;

  const { customer, items, grandTotal } = state;

  const invoice = { customer, items, grandTotal };

  // GST Split
  const calculateTax = (item) => {
    const base = item.qty * item.rate;
    const taxable = base;
    const gstAmt = (taxable * item.gst) / 100;
    const cgst = gstAmt / 2;
    const sgst = gstAmt / 2;
    return { taxable, cgst, sgst, total: taxable + gstAmt };
  };

  const totals = items.reduce(
    (acc, item) => {
      const t = calculateTax(item);
      acc.taxable += t.taxable;
      acc.cgst += t.cgst;
      acc.sgst += t.sgst;
      acc.total += t.total;
      return acc;
    },
    { taxable: 0, cgst: 0, sgst: 0, total: 0 }
  );

  return (
    <div className="min-h-screen w-full bg-(--brand-bg) p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold capitalize">{type}</h1>

        <button
          onClick={() => navigate(-1)}
          className="text-black hover:bg-gray-100 border rounded-3xl px-4 py-2 bg-white text-sm flex items-center gap-2"
        >
          ← Back
        </button>
      </div>

      {/* Invoice Box */}
      <div className="bg-white mx-auto border-2 shadow-xl"
           style={{ maxWidth: "1000px" }}>

        {/* Title */}
        <h2 className="text-center font-bold text-xl border-b-2 py-2">
          {type === "invoice" && "TAX INVOICE"}
          {type === "bill" && "BILL"}
          {type === "quotation" && "QUOTATION"}
        </h2>

        {/* Company Header */}



        <div className=" border-b-2">

          <div className="p-4 col-span-2">
            <div className="flex gap-4">
              <img src={ventarLogo} className="w-16 h-16" />
              <div>
                <h3 className="font-bold text-lg">Ventar Technologies Pvt Ltd</h3>
                <div className=" details w-full items-center justify-between">
                    <p>Office 301, IT Park Road</p>
                    <p>Pune - 411001</p>
                    <p>State Code: 27</p>
                    <p>PAN: ABCDE1234F</p>
                    <p>GSTIN: 27AAAAA0000A1Z5</p>
                </div> 
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 border-b-2">

          <div className="border-r-2 p-4">
            <h3 className="font-bold mb-2">Bill To</h3>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Phone:</strong> {customer.phone || "-"}</p>
            <p><strong>Email:</strong> {customer.email || "-"}</p>
            <p><strong>GSTIN:</strong>{customer.GSTIN || "Unregistered"}</p>
          </div>

          <div className="p-4">
            <p><strong>Invoice No:</strong> INV-{Date.now()}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Invoice Type:</strong> {type.toUpperCase()}</p>
          </div>

        </div>

        {/* Items Table */}
        <table className="w-full text-sm border-collapse border-2">

          <thead>
            <tr className="bg-gray-100 font-semibold text-center">
              <th className="border-2 p-2 w-10">Sr</th>
              <th className="border-2 p-2">Description</th>
              <th className="border-2 p-2 w-16">Qty</th>
              <th className="border-2 p-2 w-24">Rate</th>
              <th className="border-2 p-2 w-28">Taxable Value</th>
              <th className="border-2 p-2 w-24">CGST</th>
              <th className="border-2 p-2 w-24">SGST</th>
              <th className="border-2 p-2 w-28">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const t = calculateTax(item);

              return (
                <tr key={item.id} className="text-center">
                  <td className="border-2 p-2">{index + 1}</td>
                  <td className="border-2 p-2 text-left">{item.name}</td>
                  <td className="border-2 p-2">{item.qty}</td>
                  <td className="border-2 p-2 text-right">{item.rate}</td>
                  <td className="border-2 p-2 text-right">{t.taxable.toFixed(2)}</td>
                  <td className="border-2 p-2 text-right">{t.cgst.toFixed(2)}</td>
                  <td className="border-2 p-2 text-right">{t.sgst.toFixed(2)}</td>
                  <td className="border-2 p-2 text-right">{t.total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>

        </table>

        {/* Totals */}
        <div className="grid grid-cols-2 border-t-2">

          <div className="border-r-2 p-4">
            <h3 className="font-bold mb-2">Terms & Conditions</h3>
            <p className="text-sm">
              Goods once sold will not be taken back.<br />
              Subject to Pune Jurisdiction.
            </p>
          </div>

          <div className="p-4">

            <table className="w-full text-sm border-collapse border-2">
              <tbody>
                <tr>
                  <td className="border-2 p-2 font-semibold">Taxable Value</td>
                  <td className="border-2 p-2 text-right">
                    ₹ {totals.taxable.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 p-2 font-semibold">CGST Total</td>
                  <td className="border-2 p-2 text-right">
                    ₹ {totals.cgst.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 p-2 font-semibold">SGST Total</td>
                  <td className="border-2 p-2 text-right">
                    ₹ {totals.sgst.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 p-2 font-bold text-lg">
                    Invoice Total
                  </td>
                  <td className="border-2 p-2 text-right font-bold text-lg">
                    ₹ {totals.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="text-right font-semibold mt-10">
              Authorized Signatory
            </p>


          </div>

        </div>
          <div className="border-t-2 flex items-center justify-center"><p>Thank you for your business.</p></div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => alert("Save to backend coming soon")}
        >
          Save
        </button>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => generatePdf(type, invoice)}
        >
          Download
        </button>

      </div>

    </div>
  );
}
