import { CornerDownLeft } from 'lucide-react'

export const Signup = () => {
    const handleClick = () => {
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        window.open(
            'https://sibforms.com/serve/MUIFAM8fUMXiKc8Vn0vIEi40ZjEmpJcxl5KwZisLXqKciGkSsV8jeHMyGQjqZdaEFM5GvJUXLElrgukAyj0Au5QgoOUzjJDVtAjf-Y3QleKJ-ik6SxoP3yl2FBmIYLSIp34f19IrpXXJrAeL1O8ymzjSY9FB4jwbv_Z60ujzXqHdADMc0KRy47UjF7cq1KYtUTpWsY-Y1U-vu35C',
            '_blank',
            `noopener,noreferrer,width=${width},height=${height},left=${left},top=${top}`
        );
    };

    return (
        <button className="btn btn-primary" onClick={handleClick}>
            Join Waitlist
            <CornerDownLeft />
        </button>
    );
}
