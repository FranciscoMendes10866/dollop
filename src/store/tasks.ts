import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createId } from "@paralleldrive/cuid2";
import { arrayMove } from "@dnd-kit/sortable";
import { faker } from "@faker-js/faker";

export type Task = { id: string; columnId: string; content: string };

type State = {
  tasks: Array<Task>;
  selectedTask: Task | null;
};

type Actions = {
  addTask: (columnId: string) => void;
  removeTasks: (taskIds: Array<string>) => void;
  updateTask: (taskId: string, content: string) => void;
  reorderTasks: (from: number, to: number) => void;
  selectTask: (task: Task) => void;
  resetSelectedTask: () => void;
};

export const useTasksStore = create<State & Actions>()(
  immer((set) => ({
    // state
    tasks: [],
    selectedTask: null,
    // actions
    addTask: (columnId) =>
      set((state) => {
        const content = faker.commerce.product();
        state.tasks.push({ id: createId(), columnId, content });
      }),
    removeTasks: (ids) =>
      set((state) => {
        state.tasks = state.tasks.filter((datum) => !ids.includes(datum.id));
      }),
    updateTask: (taskId, content) =>
      set((state) => {
        const datums = state.tasks;
        const idx = datums.findIndex((datum) => datum.id === taskId);
        if (idx === -1) return;
        datums[idx].content = content;
      }),
    reorderTasks: (from, to) =>
      set((state) => {
        state.tasks = arrayMove(state.tasks, from, to);
      }),
    selectTask: (task) =>
      set((state) => {
        state.selectedTask = task;
      }),
    resetSelectedTask: () =>
      set((state) => {
        state.selectedTask = null;
      }),
  }))
);
