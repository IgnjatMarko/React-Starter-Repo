import { useParams } from '@tanstack/react-router'
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

export default function PostComponent() {
    const { slug } = useParams({ from: '/blog/$slug' })
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPost()
    }, [slug])

    const fetchPost = async () => {
        try {
            const response = await database.listDocuments<BlogPost>(
                STARTER_DB_ID,
                BLOGSPOT_ID,
                [Query.equal('slug', slug)]
            )
            if (response.documents.length > 0) {
                setPost(response.documents[0])
            } else {
                setPost(null)
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'An unknown error occurred'
            console.error('Error fetching post:', err)
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-[82vh] flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[82vh] flex items-center justify-center p-4">
                <div className="alert alert-error max-w-lg">
                    <span>Error loading post: {error}</span>
                </div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-[82vh] flex items-center justify-center p-4">
                <div className="alert alert-warning max-w-lg">
                    <span>Post not found.</span>
                </div>
            </div>
        )
    }

    return (
        <article className="min-h-[82vh] bg-base-100 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-6 text-accent">
                        {post.title}
                    </h1>
                    <div className="flex justify-center items-center gap-4 text-sm text-base-content/70">
                        <span className="font-medium">By {post.author}</span>
                        <span>•</span>
                        <span>
                            {format(new Date(post.$createdAt), 'MMMM d, yyyy')}
                        </span>
                    </div>
                </header>

                <div className={markdownStyles.content}>
                    <ReactMarkdown components={markdownComponents}>
                        {post.content}
                    </ReactMarkdown>
                </div>

                <footer className="mt-16 flex justify-center">
                    <Link to="/blog">
                        <button className="btn btn-outline btn-wide">
                            ← Back to Blog
                        </button>
                    </Link>
                </footer>
            </div>
        </article>
    )
}
