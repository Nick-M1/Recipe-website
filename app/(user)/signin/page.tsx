import SigninPage from "../../../components/accounts/SigninPage";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Sign In'
}

export default function Page() {
    return (
        <div>
            <SigninPage/>
        </div>
    );
}