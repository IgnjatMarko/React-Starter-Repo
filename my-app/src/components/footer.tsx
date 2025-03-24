import { APP_INFO } from '../assets/constants'

export default function FooterComponent() {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-4">
            <aside>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by {APP_INFO.author}
                </p>
            </aside>
        </footer>
    )
}
