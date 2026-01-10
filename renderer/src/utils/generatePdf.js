import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePdf = (type, invoice) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(type.toUpperCase(), 14, 20);

  doc.setFontSize(11);
  doc.text(`Customer: ${invoice.customer.name}`, 14, 30);

  const tableData = invoice.items.map((item, index) => [
    index + 1,
    item.name,
    item.qty,
    item.rate.toFixed(2),
    `${item.gst}%`,
    item.total.toFixed(2),
  ]);

  doc.autoTable({
    startY: 40,
    head: [["#", "Item", "Qty", "Rate", "GST", "Total"]],
    body: tableData,
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  doc.text(
    `Grand Total: ₹ ${invoice.grandTotal.toFixed(2)}`,
    14,
    finalY
  );

  doc.save(`${type}-${Date.now()}.pdf`);
};
