import { useState } from "react";
import icons from '../../assets/icons.svg'
import icons1 from '../../assets/icons1.svg'
import icons2 from '../../assets/icons2.svg'
import icons3 from '../../assets/icons3.svg'

interface TableProps<T> {
    columns: (keyof T)[];
    initialData: T[];
}

const Table = <T extends {}>({ columns, initialData }: TableProps<T>) => {
    const [rows, setRows] = useState<T[]>(initialData);
    const [editRows, setEditRows] = useState<{ [index: number]: Partial<T> }>({});

    function handleEdit(index: number): void {
        setEditRows((prev) => ({ ...prev, [index]: { ...rows[index] } }));
    };

    function handleSave(index: number): void {
        setRows((prev) => prev.map((row, i) => (i === index ? editRows[index] as T : row)));
        setEditRows((prev) => {
            const newEditRows = { ...prev };
            delete newEditRows[index];
            return newEditRows;
        });
    };

    function handleDiscard(index: number): void {
        setEditRows((prev) => {
            const newEditRows = { ...prev };
            delete newEditRows[index];
            return newEditRows;
        });
    };

    function handleChange(index: number, column: keyof T, value: any): void {
        setEditRows((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                [column]: value,
            },
        }));
    };

    return (
        <table className="self-stretch rounded-lg bg-text-text-tertiary border-[1px] border-solid border-surface-border w-full border-collapse">
            <thead className="bg-surface-bg-secondary">
                <tr className="p-4 gap-[20px] mq950:flex-wrap">
                    {columns?.map((column) => (
                        <th className="p-4 text-left" key={String(column)}>
                            {column}
                        </th>
                    ))}
                    <th className="p-4 text-left">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows?.map((row, rowIndex) => {
                    const isEditing = editRows[rowIndex] !== undefined;
                    return (
                        <tr className="p-4 gap-[20px] mq950:flex-wrap" key={rowIndex}>
                            {columns?.map((column) => (
                                <td className="p-4" key={String(column)}>
                                    <input
                                        type="text"
                                        value={isEditing ? editRows[rowIndex][column] as any : row[column] as any}
                                        onChange={(e) => handleChange(rowIndex, column, e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full bg-transparent"
                                    />
                                </td>
                            ))}
                            <td className="p-4 flex items-center">
                                {isEditing ? (
                                    <>
                                        <img
                                            className="cursor-pointer h-4 w-6 inline-block"
                                            loading="lazy"
                                            alt="Save"
                                            src={icons}
                                            onClick={() => handleSave(rowIndex)}
                                        />
                                        <img
                                            className="cursor-pointer h-4 w-6 inline-block"
                                            loading="lazy"
                                            alt="Discard"
                                            src={icons1}
                                            onClick={() => handleDiscard(rowIndex)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img
                                            className="cursor-pointer h-4 w-6 inline-block"
                                            loading="lazy"
                                            alt="Edit"
                                            src={icons2}
                                            onClick={() => handleEdit(rowIndex)}
                                        />
                                        <img
                                            className="cursor-pointer h-4 w-6 inline-block"
                                            loading="lazy"
                                            alt="Delete"
                                            src={icons3}
                                            onClick={() => setRows(rows.filter((_, i) => i !== rowIndex))}
                                        />
                                    </>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;