import { useQuery } from '@tanstack/react-query'
import { database, STARTER_DB_ID, SUBSCRIBERS_ID } from '../lib/appwrite'
import { Query, Models } from 'appwrite'

interface Subscribers extends Models.Document {
    email: string
}

export default function SubscribersList() {
    const { data: subscribers = [], isLoading } = useQuery<Subscribers[]>({
        queryKey: ['subscribers'],
        queryFn: async () => {
            const response = await database.listDocuments<Subscribers>(
                STARTER_DB_ID,
                SUBSCRIBERS_ID,
                [Query.orderDesc('$createdAt')]
            )
            return response.documents
        }
    })

    const emails = subscribers.map(sub => sub.email).join(', ')

    return (
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
                Sub List
            </div>
            <div className="collapse-content text-sm">
                {isLoading ? (
                    <div className="flex justify-center">
                        <span className="loading loading-spinner loading-sm"></span>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p className="break-words">{emails}</p>
                        <p className="font-medium">Total Subscribers: {subscribers.length}</p>
                    </div>
                )}
            </div>
        </div>
    )
} 