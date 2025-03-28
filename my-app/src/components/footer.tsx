import { APP_INFO } from '../assets/constants'
import { Mail, ExternalLink } from 'lucide-react'

export default function FooterComponent() {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-4 text-base">
            <aside>
                <p className="flex items-center gap-2">
                    {new Date().getFullYear()} © Built by{' '}
                    <a
                        className="link link-hover flex items-center gap-2"
                        href={
                            APP_INFO.website ? `${APP_INFO.website}` : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {APP_INFO.author}{' '}
                        {APP_INFO.website ? (
                            <ExternalLink className="w-4 h-4" />
                        ) : null}
                    </a>
                </p>
                <p>
                    <a
                        className="link link-hover flex items-center gap-2"
                        href={`mailto:${APP_INFO.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Mail className="w-4 h-4" />
                        {APP_INFO.email}
                    </a>
                </p>
            </aside>
        </footer>
    )
}
