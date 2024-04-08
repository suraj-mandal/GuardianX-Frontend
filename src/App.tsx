import Colors from "./constants/color-constants.ts";
import {Toaster as ReactHotToastToaster} from "react-hot-toast";
import {Outlet, useNavigate} from "react-router";
import useAuthentication from "./hooks/use-authentication.ts";
import {useEffect} from "react";

export default function App() {

    const {isLoggedIn} = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="bg-gray-50 h-screen">
            <main className="container">
                <ReactHotToastToaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        className: 'font-inter text-sm font-medium',
                        success: {
                            iconTheme: {
                                primary: Colors.PRIMARY,
                                secondary: Colors.WHITE
                            }
                        },
                        error: {
                            iconTheme: {
                                primary: Colors.DANGER,
                                secondary: Colors.WHITE
                            }
                        }
                    }}

                />
                <Outlet/>
            </main>
        </div>
    )
}