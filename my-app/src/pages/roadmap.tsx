import { TODOLIST_DB_ID, ROADMAP_ID } from '../lib/appwrite' 
import { useState } from 'react'
import { database, account, ID } from '../lib/appwrite' 
import { Query, Models, Permission, Role } from 'appwrite'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Todo extends Models.Document {
    title: string
    status: string 
}

export default function RoadmapComponent() {
    const [newItem, setNewItem] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const queryClient = useQueryClient()

    // Query for roadmap items
    const { data: roadmapItems = [] } = useQuery<Todo[]>({
        queryKey: ['todos', 'roadmap'],
        queryFn: async () => {
            const response = await database.listDocuments<Todo>(
                TODOLIST_DB_ID,
                ROADMAP_ID,
                [Query.equal('status', 'roadmap')]
            )
            return response.documents
        }
    })

    // Query for completed items
    const { data: completedItems = [] } = useQuery<Todo[]>({
        queryKey: ['todos', 'completed'],
        queryFn: async () => {
            const response = await database.listDocuments<Todo>(
                TODOLIST_DB_ID,
                ROADMAP_ID,
                [
                    Query.equal('status', 'completed'),
                    Query.orderDesc('$createdAt'),
                ] 
            )
            return response.documents
        }
    })

    // Add todo mutation
    const addTodoMutation = useMutation({
        mutationFn: async (title: string) => {
            return database.createDocument<Todo>(
                TODOLIST_DB_ID,
                ROADMAP_ID,
                ID.unique(),
                { title, status: 'roadmap' },
                [Permission.write(Role.label('admin'))]
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', 'roadmap'] })
            setNewItem('')
        },
        onError: () => {
            setErrorWithTimeout('Failed to add todo: No permission')
        }
    })

    // Complete todo mutation
    const completeTodoMutation = useMutation({
        mutationFn: async (id: string) => {
            return database.updateDocument<Todo>(
                TODOLIST_DB_ID,
                ROADMAP_ID,
                id,
                { status: 'completed' },
                [Permission.update(Role.label('admin'))]
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', 'roadmap'] })
            queryClient.invalidateQueries({ queryKey: ['todos', 'completed'] })
        },
        onError: () => {
            setErrorWithTimeout('Failed to complete todo: No permission')
        }
    })

    // Delete todo mutation
    const deleteTodoMutation = useMutation({
        mutationFn: async (id: string) => {
            return database.deleteDocument(TODOLIST_DB_ID, ROADMAP_ID, id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', 'roadmap'] })
            queryClient.invalidateQueries({ queryKey: ['todos', 'completed'] })
        },
        onError: () => {
            setErrorWithTimeout('Failed to delete todo: No permission')
        }
    })

    // Add a new item
    const addTodo = async () => {
        if (!newItem.trim()) return
        addTodoMutation.mutate(newItem)
    }

    // Mark an item as completed
    const completeTodo = (id: string) => {
        completeTodoMutation.mutate(id)
    }

    // Delete an item
    const deleteTodo = (id: string) => {
        deleteTodoMutation.mutate(id)
    }

    const setErrorWithTimeout = (message: string) => {
        setError(message) 
        setTimeout(() => {
            setError(null) 
        }, 2500) 
    }

    return (
        <div className="hero bg-base-100 min-h-[87vh] p-4">
            <div className="max-w-4xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                    {/* Roadmap Items Card */}
                    <div className="card card-border border-base-200 bg-base-200 shadow-md w-full max-w-[320px]">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center justify-center text-lg mb-3">Roadmap</h2>
                            <div className="space-y-2">
                                {roadmapItems.map((item) => (
                                    <div key={item.$id} className="flex items-center gap-2 bg-base-300 border border-base-200 p-2 rounded-lg">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary checkbox-xs"
                                            onChange={() => completeTodo(item.$id)}
                                        />
                                        <span className="flex-1 text-left break-words text-sm">{item.title}</span>
                                    </div>
                                ))}
                                {roadmapItems.length === 0 && (
                                    <div className="text-center text-base-content/60 text-sm">No items in roadmap</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Completed Items Card */}
                    <div className="card card-border bg-base-200 shadow-md w-full max-w-[320px]">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center justify-center text-lg mb-3">Completed</h2>
                            <div className="space-y-2">
                                {completedItems.map((item) => (
                                    <div key={item.$id} className="flex items-center gap-2 bg-base-300 border border-base-200 p-2 rounded-lg">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-error checkbox-xs"
                                            onChange={() => deleteTodo(item.$id)}
                                        />
                                        <span className="flex-1 text-left break-words text-sm line-through opacity-70">{item.title}</span>
                                    </div>
                                ))}
                                {completedItems.length === 0 && (
                                    <div className="text-center text-base-content/60 text-sm">No completed items</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Add New Item Card */}
                    <div className="card card-border bg-base-200 shadow-md w-full max-w-[320px]">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center justify-center text-lg mb-3">Add New Item</h2>
                            <div className="form-control">
                                <input
                                    type="text"
                                    className="input input-bordered input-xs w-full text-sm"
                                    placeholder="Enter new item"
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                                />
                                <button
                                    className="btn btn-primary btn-sm mt-3 w-full"
                                    onClick={addTodo}
                                    disabled={!newItem.trim()}
                                >
                                    Add Item
                                </button>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="alert alert-error alert-sm mt-3 p-2 text-sm">
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
