import CreateAccount from "../../../components/accounts/CreateAccount";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Create Account'
}

export default function Page() {
    return (
        <div>
            <CreateAccount/>
        </div>
    );
}