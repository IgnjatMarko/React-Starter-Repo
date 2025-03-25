import { TODOLIST_DB_ID, ROADMAP_ID } from '../lib/appwrite' // Import Appwrite database IDs
import { useEffect, useState } from 'react'
import { database, account, ID } from '../lib/appwrite'
import { Query, Models, Permission, Role } from 'appwrite'

interface Todo extends Models.Document {
    title: string
    status: string // "roadmap" or "completed"
}

export default function RoadmapComponent() {
    const [roadmapItems, setRoadmapItems] = useState<Todo[]>([])
    const [completedItems, setCompletedItems] = useState<Todo[]>([])
    const [newItem, setNewItem] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    // Fetch roadmap items
    const fetchRoadmapItems = async () => {
        try {
            const response = await database.listDocuments<Todo>(
                TODOLIST_DB_ID,
                ROADMAP_ID,
                [Query.equal('status', 'roadmap')]
            )
            setRoadmapItems(response.documents)
        } catch (err: any) {
            //console.error('Failed to fetch roadmap items:', err)
            setError('Failed to fetch roadmap items')
        }
    }

    // Fetch completed items
    const fetchCompletedItems = async () => {
        try {
            const response = await database.listDocuments<Todo>(
                TODOLIST_DB_ID,
                ROADMAP_ID,
                [
                    Query.equal('status', 'completed'),
                    Query.orderDesc('$createdAt'),
                ] // Sort by creation date in descending order
            )
            setCompletedItems(response.documents)
        } catch (err: any) {
            //console.error('Failed to fetch completed items:', err)
            setError('Failed to fetch completed items')
        }
    }

    // Add a new item to the database
    const addTodo = async () => {
        if (!newItem.trim()) return
        try {
            const response = await database.createDocument<Todo>(
                TODOLIST_DB_ID,
                ROADMAP_ID,
                ID.unique(),
                { title: newItem, status: 'roadmap' },
                [Permission.write(Role.label('admin'))]
            )
            setRoadmapItems((prev) => [...prev, response])
            setNewItem('') // Clear input field
        } catch (err: any) {
            console.error('Failed to add todo:', err)
            setErrorWithTimeout('Failed to add todo: No permission')
        }
    }

    // Mark an item as completed
    const completeTodo = async (id: string) => {
        try {
            const updatedItem = await database.updateDocument<Todo>(
                TODOLIST_DB_ID,
                ROADMAP_ID,
                id,
                { status: 'completed' },
                [Permission.update(Role.label('admin'))]
            )
            setRoadmapItems((prev) => prev.filter((item) => item.$id !== id))
            setCompletedItems((prev) => [...prev, updatedItem])
        } catch (err: any) {
            console.error('Failed to complete todo:', err)
            setErrorWithTimeout('Failed to complete todo: No permission')
        }
    }

    // Delete an item from the database
    const deleteTodo = async (id: string) => {
        try {
            await database.deleteDocument(TODOLIST_DB_ID, ROADMAP_ID, id)
            setRoadmapItems((prev) => prev.filter((item) => item.$id !== id))
            setCompletedItems((prev) => prev.filter((item) => item.$id !== id))
        } catch (err: any) {
            console.error('Failed to delete todo:', err)
            setErrorWithTimeout('Failed to delete todo: No permission')
        }
    }

    // const checkAuthentication = async () => {
    //     try {
    //         let user = await account.get() // Check if the user is logged in
    //         console.log('User is authenticated:', user);
    //     } catch (err) {
    //         console.log('User is not authenticated:', err)
    //         setErrorWithTimeout('You must be logged in to add a to-do item.')
    //     }
    // }

    const setErrorWithTimeout = (message: string) => {
        setError(message) // Set the error message
        setTimeout(() => {
            setError(null) // Clear the error after 5 seconds
        }, 5000) // 5000ms = 5 seconds
    }

    useEffect(() => {
        fetchRoadmapItems()
        fetchCompletedItems()
        //checkAuthentication()
    }, [])

    return (
        <div className="hero bg-base-100 min-h-[87vh]">
            <div className="hero-content text-center">
                <div className="max-w-3xl flex flex-col md:flex-row gap-4">
                    {/* Roadmap Items */}
                    <ul className="menu bg-base-200 rounded-box md:w-1/3 sm:max-w-[400px]">
                        <li>
                            <h2 className="card-title">Roadmap</h2>
                            <ul>
                                {roadmapItems.map((item) => (
                                    <li key={item.$id}>
                                        <p>
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                onChange={() =>
                                                    completeTodo(item.$id)
                                                }
                                            />
                                            {item.title}
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-xs checkbox-error"
                                                onChange={() =>
                                                    deleteTodo(item.$id)
                                                }
                                            />
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    {/* Completed Items */}
                    <ul className="menu bg-base-200 rounded-box md:w-1/3 sm:max-w-[400px] min-w-[200px]">
                        <li>
                            <h2 className="card-title">Completed</h2>
                            <ul>
                                {completedItems.map((item) => (
                                    <li key={item.$id}>
                                        <label className="line-through">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-xs checkbox-secondary"
                                                onChange={() =>
                                                    deleteTodo(item.$id)
                                                }
                                            />
                                            {item.title}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    {/* Add New Item */}
                    <div className="menu md:w-1/3 sm:max-w-[400px] min-w-[200px]">
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="New item"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                        />
                        <button
                            className="btn btn-primary mt-2"
                            onClick={addTodo}
                        >
                            Add Item
                        </button>

                        {/* Error Message */}
                        {error && (
                            <div
                                role="alert"
                                className="alert alert-error alert-soft mt-2"
                            >
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
