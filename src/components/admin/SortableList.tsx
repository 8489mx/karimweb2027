import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SortableItem({ id, children, className }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as any,
  };

  return (
    <div ref={setNodeRef} style={style} className={className}>
      {/* We pass attributes and listeners to a specific handle element inside children, 
          or we can just clone the first child to attach it. 
          Actually, the caller should have a drag handle. Let's provide it via Context. */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...attributes,
            ...listeners,
            isDragging
          } as any);
        }
        return child;
      })}
    </div>
  );
}

// Actually, it's better if we just give the user a drag handle component.

export function DragHandle(props: any) {
  return (
    <button type="button" {...props} className={"cursor-grab active:cursor-grabbing hover:text-brand-primary " + (props.className || "")}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
    </button>
  );
}

interface SortableListProps {
  items: any[];
  onReorder: (newItems: any[]) => void;
  renderItem: (item: any, index: number, dragHandleProps: any) => React.ReactNode;
  keyExtractor: (item: any, index: number) => string;
  strategy?: 'vertical' | 'horizontal' | 'rect';
  className?: string;
}

export function SortableList({ items, onReorder, renderItem, keyExtractor, strategy = 'vertical', className }: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item, i) => keyExtractor(item, i) === active.id);
      const newIndex = items.findIndex((item, i) => keyExtractor(item, i) === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  const str = strategy === 'vertical' ? verticalListSortingStrategy : strategy === 'horizontal' ? horizontalListSortingStrategy : rectSortingStrategy;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((it, i) => keyExtractor(it, i))} strategy={str}>
        <div className={className}>
          {items.map((item, index) => {
            const id = keyExtractor(item, index);
            return <SortableItemWrapper key={id} id={id} item={item} index={index} renderItem={renderItem} />;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItemWrapper({ id, item, index, renderItem }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as any,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {renderItem(item, index, { ...attributes, ...listeners })}
    </div>
  );
}
