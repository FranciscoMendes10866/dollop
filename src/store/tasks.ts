import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createId } from "@paralleldrive/cuid2";
import { arrayMove } from "@dnd-kit/sortable";
import { faker } from "@faker-js/faker";

export type Task = { id: string; columnId: string; heading: string };

type State = {
  tasks: Array<Task>;
};

type Actions = {
  addTask: (columnId: string) => void;
  removeTasks: (taskIds: Array<string>) => void;
  updateTask: (taskId: string, heading: string) => void;
  reorderTasks: (from: number, to: number) => void;
};

export const useTasksStore = create<State & Actions>()(
  immer((set) => ({
    // state
    tasks: [],
    // actions
    addTask: (columnId) =>
      set((state) => {
        const heading = faker.commerce.product();
        state.tasks.push({ id: createId(), columnId, heading });
      }),
    removeTasks: (ids) =>
      set((state) => {
        state.tasks = state.tasks.filter((datum) => !ids.includes(datum.id));
      }),
    updateTask: (taskId, heading) =>
      set((state) => {
        const datums = state.tasks;
        const idx = datums.findIndex((datum) => datum.id === taskId);
        if (idx === -1) return;
        datums[idx].heading = heading;
      }),
    reorderTasks: (from, to) =>
      set((state) => {
        state.tasks = arrayMove(state.tasks, from, to);
      }),
  }))
);
