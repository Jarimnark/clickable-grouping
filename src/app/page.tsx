"use client";

import { useState } from "react";

interface ObjType {
    type: "Fruit" | "Vegetable";
    name: string;
}
export default function Home() {
    const initialData: ObjType[] = [
        {
            type: "Fruit",
            name: "Apple",
        },
        {
            type: "Vegetable",
            name: "Broccoli",
        },
        {
            type: "Vegetable",
            name: "Mushroom",
        },
        {
            type: "Fruit",
            name: "Banana",
        },
        {
            type: "Vegetable",
            name: "Tomato",
        },
        {
            type: "Fruit",
            name: "Orange",
        },
        {
            type: "Fruit",
            name: "Mango",
        },
        {
            type: "Fruit",
            name: "Pineapple",
        },
        {
            type: "Vegetable",
            name: "Cucumber",
        },
        {
            type: "Fruit",
            name: "Watermelon",
        },
        {
            type: "Vegetable",
            name: "Carrot",
        },
    ];
    const [items, setItems] = useState<ObjType[]>(initialData);

    const [movedItems, setMovedItems] = useState<{
        Fruit: ObjType[];
        Vegetable: ObjType[];
    }>({ Fruit: [], Vegetable: [] });

    const handleClick = (item: ObjType) => {
        // Move the item to the corresponding type block
        setItems((prevItems) => prevItems.filter((block) => block !== item));
        setMovedItems((prevMoved) => ({
            ...prevMoved,
            [item.type]: [...prevMoved[item.type], item],
        }));

        // Set a timeout to move the item back after 5 seconds
        setTimeout(() => {
            setMovedItems((prevMoved) => ({
                ...prevMoved,
                [item.type]: prevMoved[item.type].filter(
                    (block) => block !== item
                ),
            }));
            setItems((prevItems) => [...prevItems, item]);
        }, 5000);
    };

    const sendBack = (item: ObjType) => {
        // Immediately move the item back to the left container
        setMovedItems((prevMoved) => ({
            ...prevMoved,
            [item.type]: prevMoved[item.type].filter((block) => block !== item),
        }));
        setItems((prevItems) => [...prevItems, item]);
    };

    return (
        <div className="grid grid-cols-3 w-100 h-screen gap-4 p-4">
            {/* Items List */}
            <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(item)}
                        className="cursor-pointer py-4 border-2 border-solid border-gray-400 text-center"
                    >
                        {item.name}
                    </div>
                ))}
            </div>

            {/* Fruit Block */}
            <div className="h-100 border-2 border-solid border-gray-400">
                <div className="text-center py-4 bg-gray-200 mb-4">Fruit</div>
                {movedItems.Fruit.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => sendBack(item)}
                        className="pointer-curser mb-4 mx-2 border-2 py-4 border-solid border-gray-400 text-center"
                    >
                        {item.name}
                    </div>
                ))}
            </div>

            {/* Vegetable Block */}
            <div className="h-100 border-2 border-solid border-gray-400">
                <div className="text-center py-4 bg-gray-200 mb-4">
                    Vegetable
                </div>
                {movedItems.Vegetable.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => sendBack(item)}
                        className="pointer-curser mb-4 mx-2 border-2 py-4 border-solid border-gray-400 text-center"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
