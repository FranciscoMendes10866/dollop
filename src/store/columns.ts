import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createId } from "@paralleldrive/cuid2";
import { arrayMove } from "@dnd-kit/sortable";
import { faker } from "@faker-js/faker";

export type Column = { id: string; heading: string };

type State = {
  columns: Array<Column>;
  selectedColumn: Column | null;
};

type Actions = {
  addColumn: () => void;
  removeColumn: (columnId: string) => void;
  updateColumn: (columnId: string, heading: string) => void;
  reorderColumns: (from: number, to: number) => void;
  selectColumn: (column: Column) => void;
  resetSelectedColumn: () => void;
};

export const useColumnsStore = create<State & Actions>()(
  immer((set) => ({
    // state
    columns: [],
    selectedColumn: null,
    // actions
    addColumn: () =>
      set((state) => {
        const heading = faker.commerce.department();
        state.columns.push({ id: createId(), heading });
      }),
    removeColumn: (columnId) =>
      set((state) => {
        const datums = state.columns;
        const idx = datums.findIndex((datum) => datum.id === columnId);
        if (idx === -1) return;
        datums.splice(idx, 1);
      }),
    updateColumn: (columnId, heading) =>
      set((state) => {
        const datums = state.columns;
        const idx = datums.findIndex((datum) => datum.id === columnId);
        if (idx === -1) return;
        datums[idx].heading = heading;
      }),
    reorderColumns: (from, to) =>
      set((state) => {
        state.columns = arrayMove(state.columns, from, to);
      }),
    selectColumn: (column) =>
      set((state) => {
        state.selectedColumn = column;
      }),
    resetSelectedColumn: () =>
      set((state) => {
        state.selectedColumn = null;
      }),
  }))
);
