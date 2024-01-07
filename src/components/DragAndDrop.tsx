import { useCallback, useMemo, PropsWithChildren } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { useColumnsStore, useTasksStore } from "../store";
import { DND_TYPE } from "../constants";

export default function DragAndDrop(props: PropsWithChildren) {
  const { columns, reorderColumns, resetSelectedColumn, selectColumn } =
    useColumnsStore();
  const { tasks, reorderTasks, selectTask, resetSelectedTask } =
    useTasksStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragStart = useCallback(
    (evt: DragStartEvent) => {
      const evtDatum = evt.active.data;
      if (evtDatum.current?.type === DND_TYPE.COLUMN) {
        selectColumn(evtDatum.current.column);
        return;
      }
      if (evtDatum.current?.type === DND_TYPE.TASK) {
        selectTask(evtDatum.current.task);
        return;
      }
    },
    [selectColumn, selectTask]
  );

  const onDragEnd = useCallback(
    (evt: DragEndEvent) => {
      resetSelectedColumn();
      resetSelectedTask();
      const { active, over } = evt;
      const isColumn = active.data.current?.type === DND_TYPE.COLUMN;
      if (!over || !isColumn) return;

      const activeId = active.id;
      const overId = over.id;
      if (activeId === overId) return;

      reorderColumns(
        columns.findIndex(({ id }) => id === activeId),
        columns.findIndex(({ id }) => id === overId)
      );
    },
    [columns, reorderColumns, resetSelectedColumn, resetSelectedTask]
  );

  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;
      if (activeId === overId) return;

      const isActiveATask = active.data.current?.type === DND_TYPE.TASK;
      const isOverATask = over.data.current?.type === DND_TYPE.TASK;
      if (!isActiveATask) return;

      if (isActiveATask && isOverATask) {
        const activeIndex = tasks.findIndex(({ id }) => id === activeId);
        const overIndex = tasks.findIndex(({ id }) => id === overId);
        reorderTasks(activeIndex, overIndex);
        return;
      }
    },
    [reorderTasks, tasks]
  );

  const items = useMemo(() => columns.map((column) => column.id), [columns]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <SortableContext items={items}>{props.children}</SortableContext>
    </DndContext>
  );
}
