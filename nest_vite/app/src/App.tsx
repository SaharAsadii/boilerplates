import { useEffect, useState } from "react";
import { getItems, createItem, deleteItem } from "./api";

function App() {
  const [items, setItems] = useState<
    { name: ""; description: ""; _id: string }[]
  >([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleCreate = async () => {
    if (!newItem.name || !newItem.description) return;
    await createItem(newItem);
    setNewItem({ name: "", description: "" });
    loadItems();
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Simple CRUD App</h1>

      <div className="mt-4">
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleCreate}>
          Add
        </button>
      </div>

      <ul className="mt-4">
        {items.map((item) => (
          <li key={item._id} className="flex justify-between p-2 border">
            <span>
              {item.name} - {item.description}
            </span>
            <button
              className="bg-red-500 text-white p-2"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
