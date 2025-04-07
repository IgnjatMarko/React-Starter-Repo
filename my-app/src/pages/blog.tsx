import { STARTER_DB_ID, BLOGSPOT_ID, database } from '../lib/appwrite'
import { useEffect, useState } from 'react'
import { Models, Query } from 'appwrite'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { markdownStyles, markdownComponents } from '../styles/markdown'

// Type for blog post document
interface BlogPost extends Models.Document {
    title: string
    content: string
    author: string
    slug: string
    $createdAt: string
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number = 300) => {
    // Remove markdown syntax before truncating
    const plainText = text
        .replace(/[#*`_~[\]]/g, '')
        .replace(/\n/g, ' ')
        .trim()
    if (plainText.length <= maxLength) return text
    return plainText.slice(0, maxLength).trim() + '...'
}

export default function BlogComponent() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await database.listDocuments<BlogPost>(
                STARTER_DB_ID,
                BLOGSPOT_ID,
                [Query.limit(10)]
            )
            setPosts(response.documents)
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'An unknown error occurred'
            console.error('Error fetching posts:', err)
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-[82vh] flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[82vh] flex items-center justify-center">
                <div className="alert alert-error">
                    <span>Error loading blog posts: {error}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-layout bg-base-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-5xl font-bold text-center mb-16 text-accent">
                    Blogspot
                </h1>
                {posts.length > 0 ? (
                    <div className="space-y-10">
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="card-body p-8">
                                    <h2 className="card-title text-3xl font-bold mb-4 text-accent">
                                        {post.title}
                                    </h2>
                                    <div className={`prose prose-lg prose-headings:mt-0 prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-ul:list-disc prose-ol:list-decimal ` + markdownStyles}>
                                        <div className="text-base-content/80 text-lg leading-relaxed line-clamp-3 mb-6">
                                            <ReactMarkdown components={markdownComponents}>
                                                {truncateText(post.content)}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-base-content/70 border-t border-base-300 pt-4">
                                        <span className="font-medium">
                                            By {post.author}
                                        </span>
                                        <span>
                                            {format(
                                                new Date(post.$createdAt),
                                                'MMMM d, yyyy'
                                            )}
                                        </span>
                                    </div>
                                    <div className="card-actions justify-end mt-6">
                                        <Link to={`/blog/${post.slug}`}>
                                            <button className="btn btn-primary btn-wide">
                                                Read More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-base-content/70">
                        <p className="text-xl">No blog posts found.</p>
                    </div>
                )}
                <div className="text-center mt-8">
                    <Link to="/">
                        <button className="btn btn-outline">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
