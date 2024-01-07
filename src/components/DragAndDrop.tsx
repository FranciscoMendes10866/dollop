import { useCallback, type PropsWithChildren, useMemo } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { useColumnsStore } from "../store";
import { DND_TYPE } from "../constants";

export default function DragAndDrop(props: PropsWithChildren) {
  const columnsStore = useColumnsStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragEnd = useCallback(
    (evt: DragEndEvent) => {
      const { active, over } = evt;
      const isColumn = active.data.current?.type === DND_TYPE.COLUMN;
      if (!over || !isColumn) return;

      const activeId = active.id;
      const overId = over.id;
      if (activeId === overId) return;

      columnsStore.reorderColumns(
        columnsStore.columns.findIndex(({ id }) => id === activeId),
        columnsStore.columns.findIndex(({ id }) => id === overId)
      );
    },
    [columnsStore]
  );

  const items = useMemo(
    () => columnsStore.columns.map((column) => column.id),
    [columnsStore.columns]
  );

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext items={items}>{props.children}</SortableContext>
    </DndContext>
  );
}
