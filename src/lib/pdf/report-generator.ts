import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DepreciationInput, DepreciationResult } from '../logic/depreciation-engine';

export function generateDepreciationReport(
    input: DepreciationInput,
    result: DepreciationResult,
    resultB?: DepreciationResult | null,
    scenarioBInput?: DepreciationInput
) {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 60, 100);
    doc.text("2026 Depreciation Report", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 26);
    doc.text(`Asset: ${input.assetType.name} (${input.assetType.category})`, 14, 32);

    // OBBBA Stamp
    if (input.bonusRateElection === 100) {
        doc.setFillColor(220, 255, 220);
        doc.rect(140, 15, 55, 10, 'F');
        doc.setTextColor(0, 100, 0);
        doc.setFontSize(10);
        doc.text("OBBBA 100% ELIGIBLE", 145, 21);
    }

    // Input Details Table
    const inputData = [
        ['Cost Basis', `$${input.cost.toLocaleString()}`],
        ['Purchase Date', input.purchaseDate.toLocaleDateString()],
        ['Section 179 Election', input.takeSection179 ? 'Yes' : 'No'],
        ['Bonus Election', `${input.bonusRateElection}%`],
        ['QROZ Location', input.inQROZ ? 'Yes' : 'No'],
    ];

    autoTable(doc, {
        startY: 40,
        head: [['Configuration', 'Value']],
        body: inputData,
        theme: 'striped',
        headStyles: { fillColor: [66, 133, 244] }
    });

    // Results Summary
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor(40, 60, 100);
    doc.text("Tax Deduction Summary (Year 1)", 14, finalY);

    const summaryData = [
        ['Method', 'Deduction Amount'],
        ['Section 179', `$${result.section179Deduction.toLocaleString()}`],
        ['Bonus Depreciation', `$${result.bonusDeduction.toLocaleString()}`],
        ['MACRS (Normal)', `$${result.normalDepreciationYear1.toLocaleString()}`],
        ['TOTAL YEAR 1 DEDUCTION', `$${result.totalYear1Deduction.toLocaleString()}`],
    ];

    autoTable(doc, {
        startY: finalY + 5,
        head: [['Category', 'Amount']],
        body: summaryData,
        theme: 'grid',
        headStyles: { fillColor: [40, 167, 69] }, // Green
        foot: [['Estimated Tax Savings (21%)', `$${(result.totalYear1Deduction * 0.21).toLocaleString()}`]],
        footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    });

    // Comparison Section (if exists)
    if (resultB) {
        let compY = (doc as any).lastAutoTable.finalY + 15;
        doc.setFontSize(14);
        doc.setTextColor(40, 60, 100);
        doc.text("Comparison Scenario", 14, compY);

        const compData = [
            ['Scenario', 'Total Deduction', 'Difference'],
            ['Selected Scenario', `$${result.totalYear1Deduction.toLocaleString()}`, '-'],
            ['Comparison Scenario', `$${resultB.totalYear1Deduction.toLocaleString()}`, `$${(resultB.totalYear1Deduction - result.totalYear1Deduction).toLocaleString()}`]
        ];

        autoTable(doc, {
            startY: compY + 5,
            head: [['Scenario', 'Deduction', 'Delta']],
            body: compData,
            theme: 'plain',
            headStyles: { fillColor: [100, 100, 100] }
        });
    }

    // Disclaimer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Disclaimer: This report is an estimate based on OBBBA 2026 rules. Consult a tax professional.", 14, pageHeight - 10);

    doc.save('bonus-depreciation-report.pdf');
}
