"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
// import { DataTableRowActions } from "@/components/table/data-table/table-row-actions"

import { Schedule } from "@/components/admin/schedule/table/data/schema"
import { DataTableColumnHeader } from "@/components/table/data-table/table-column-header"

export const columns: ColumnDef<Schedule>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Schedule" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Minute" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("minute")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "0",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monday" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("0")}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tuesday" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("1")}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wednesday" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("2")}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thursday" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("3")}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "4",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Friday" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("4")}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "5",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Saturday" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("5")}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "6",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sunday" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("6")}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
