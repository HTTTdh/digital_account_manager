import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function DataTable({ columns, data }) {
    return (
        <Table className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <TableRow>
                    {columns.map((col) => (
                        <TableHead
                            key={col.key}
                            className={`font-semibold text-gray-700 text-${col.align || "left"}`}
                        >
                            {col.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, idx) => (
                    <TableRow key={idx} className="hover:bg-blue-50 transition-colors even:bg-gray-50">
                        {columns.map((col) => (
                            <TableCell
                                key={col.key}
                                className={`text-${col.align || "left"} ${col.className || ""}`}
                            >
                                {col.render ? col.render(row) : row[col.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
