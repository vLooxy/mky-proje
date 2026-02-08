"use client";

import { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { LinkItem } from "@/types/settings";

interface LinkListEditorProps {
    items: LinkItem[];
    onChange: (items: LinkItem[]) => void;
    allowNesting?: boolean;
}

export function LinkListEditor({ items = [], onChange, allowNesting = false }: LinkListEditorProps) {
    const [localItems, setLocalItems] = useState<LinkItem[]>(items.map(i => ({ ...i, id: i.id || crypto.randomUUID() } as LinkItem)));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = localItems.findIndex((i) => i.id === active.id);
            const newIndex = localItems.findIndex((i) => i.id === over.id);
            const newItems = arrayMove(localItems, oldIndex, newIndex);
            setLocalItems(newItems);
            onChange(newItems);
        }
    };

    const handleUpdate = (index: number, key: keyof LinkItem, value: LinkItem[keyof LinkItem]) => {
        const newItems = [...localItems];
        newItems[index] = { ...newItems[index], [key]: value };
        setLocalItems(newItems);
        onChange(newItems);
    };

    const handleAdd = () => {
        const newItem = { id: crypto.randomUUID(), label: "Yeni Link", href: "/" };
        const newItems = [...localItems, newItem];
        setLocalItems(newItems);
        onChange(newItems);
    };

    const handleRemove = (index: number) => {
        const newItems = localItems.filter((_, i) => i !== index);
        setLocalItems(newItems);
        onChange(newItems);
    };

    const handleSubItemChange = (parentIndex: number, newSubItems: LinkItem[]) => {
        handleUpdate(parentIndex, "subItems", newSubItems);
    };

    return (
        <div className="space-y-4">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={localItems.map(i => i.id!)} strategy={verticalListSortingStrategy}>
                    {localItems.map((item, index) => (
                        <SortableLinkItem
                            key={item.id}
                            item={item}
                            index={index}
                            allowNesting={allowNesting}
                            onUpdate={handleUpdate}
                            onRemove={handleRemove}
                            onSubItemChange={handleSubItemChange}
                        />
                    ))}
                </SortableContext>
            </DndContext>
            <button
                type="button"
                onClick={handleAdd}
                className="text-sm text-primary font-bold hover:underline flex items-center gap-1"
            >
                <span className="material-symbols-outlined text-sm">add</span> Yeni Ekle
            </button>
        </div>
    );
}

interface SortableLinkItemProps {
    item: LinkItem;
    index: number;
    allowNesting: boolean;
    onUpdate: (index: number, key: keyof LinkItem, value: LinkItem[keyof LinkItem]) => void;
    onRemove: (index: number) => void;
    onSubItemChange: (index: number, newSubItems: LinkItem[]) => void;
}

function SortableLinkItem({ item, index, allowNesting, onUpdate, onRemove, onSubItemChange }: SortableLinkItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id! });
    const style = { transform: CSS.Transform.toString(transform), transition };
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div ref={setNodeRef} style={style} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm group">
            <div className="flex items-center gap-3">
                <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined">drag_indicator</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2">
                    <input
                        className="bg-transparent border-b border-gray-200 dark:border-gray-700 text-sm p-1 focus:outline-none focus:border-primary"
                        value={item.label}
                        onChange={(e) => onUpdate(index, "label", e.target.value)}
                        placeholder="Başlık"
                    />
                    <input
                        className="bg-transparent border-b border-gray-200 dark:border-gray-700 text-sm p-1 focus:outline-none focus:border-primary text-gray-500"
                        value={item.href}
                        onChange={(e) => onUpdate(index, "href", e.target.value)}
                        placeholder="Link (/url)"
                    />
                </div>
                <div className="flex items-center gap-1">
                    {allowNesting && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 ${isExpanded ? 'text-primary' : 'text-gray-400'}`}
                            title="Alt Menü"
                        >
                            <span className="material-symbols-outlined text-lg">list</span>
                        </button>
                    )}
                    <button onClick={() => onRemove(index)} className="p-1 text-red-400 hover:bg-red-50 hover:text-red-500 rounded">
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            </div>

            {/* Nested Items */}
            {allowNesting && isExpanded && (
                <div className="mt-3 pl-8 border-l-2 border-slate-100 dark:border-slate-700 ml-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Alt Menü</h4>
                    <LinkListEditor
                        items={item.subItems || []}
                        onChange={(newSubItems) => onSubItemChange(index, newSubItems)}
                        allowNesting={false} // Only 1 level deep for now
                    />
                </div>
            )}
        </div>
    );
}
